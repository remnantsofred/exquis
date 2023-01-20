const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Skeleton = require('../models/Skeleton');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Bone = require('../models/Bone');
const Tag = require('../models/Tag');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 20;
const NUM_SEED_SKELETONS = 40;
const NUM_SEED_COMMENTS = 30;
const NUM_SEED_LIKES = 20;



// Seed users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

for (let i = 0; i < NUM_SEED_USERS; i++) {
  const user = new User ({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync("password", 10),
    skeletons: [],
    comments: []
  });

  users.push(user);
}


// Randomly select an owner
const random = Math.floor(Math.random() * NUM_SEED_USERS)
const ownerId = users[random]._id


// Seed skeletons
const skeletons = [];
for (const user of users){
  let ownerIndex = users.indexOf(user);
  for (let i = 0; i < 3; i++) {
    let collaborator1Id = users[(ownerIndex+1) % NUM_SEED_USERS]._id;
    let collaborator2Id = users[(ownerIndex+2) % NUM_SEED_USERS]._id; 
    const skeleton = new Skeleton ({
      owner: user._id, 
      title: faker.lorem.sentence(),
      prompt: faker.lorem.paragraph(),
      maxBones: faker.datatype.number({'min': 3,'max': 6}),
      maxCollabrators: faker.datatype.number({'min': 3,'max': 6}),
      collaborators: [collaborator1Id, collaborator2Id],
      bones: [],
      tags: [],
      likes: [],
      comments: []
    });
    skeletons.push(skeleton);
  }

}
 

skeletons.forEach(skeleton => {
  users.forEach(user => {
    if (user._id === skeleton.owner) {
      user.skeletons.push(skeleton);
    } else if (skeleton.collaborators.includes(user._id)) {
      user.skeletons.push(skeleton);
    }
  })
})


// Seed comments
const comments = [];

for (const skeleton of skeletons) {

  for (let i = 0; i < NUM_SEED_COMMENTS; i++) {
    const comment = new Comment ({
      text: faker.lorem.paragraph(),
      parent: skeleton._id,

      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
    });

    comments.push(comment);
  }
}


comments.forEach(comment => {
  users.forEach(user => {
    if (user._id === comment.author) {
      user.comments.push(comment._id);
    }
  })
})

comments.forEach(comment => {
  skeletons.forEach(skeleton => {
    if (skeleton._id === comment.parent) {
      skeleton.comments.push(comment._id);
    }
  })
})


// Seed likes
const likes = [];

for (const skeleton of skeletons) {
  
  for (let i = 0; i < NUM_SEED_LIKES; i++) {
    const like = new Like ({
      skeleton: skeleton._id,
      liker: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      type: faker.random.word(["like", "dislike", "like", "like"]) //[1, -1, 1, 1, 1, -1, -1]
    });
    likes.push(like);
  }
}

likes.forEach(like => {
  skeletons.forEach(skeleton => {
    if (skeleton._id === like.skeleton) {
      skeleton.likes.push(like._id);
    }
  })
})

// likes.forEach(like => {
//   users.forEach(user => {
//     if (user._id === like.liker) {
//       user.likes.push(like._id);
//     }
//   })
// })


// Seed bones
const bones = []; 

skeletons.forEach(skeleton => {
  const skeletonId = skeleton._id;

  const boneForOwner = new Bone ({
    text: faker.lorem.paragraph(),
    skeleton: skeletonId,
    author: skeleton.owner
  });

  bones.push(boneForOwner);

  skeleton.collaborators.forEach(collaborator => {
    const bone = new Bone ({
      text: faker.lorem.paragraph(),
      skeleton: skeletonId,
      author: collaborator
    });
    skeleton.bones.push(bone);
  });

  skeleton.update()
});


// bones.forEach(bone => {
//   skeletons.forEach(skeleton => {
//     if (skeleton._id === bone.skeleton) {
//       skeleton.bones.push(bone._id);
//     }
//   })
// })



// Seed tags
const tags = [];

skeletons.forEach(skeleton => {
  const skeletonId = skeleton._id;

  const tagForOwner = new Tag ({
    text: faker.lorem.word(),
    skeleton: skeletonId,
    owner: skeleton.owner
  });

  tags.push(tagForOwner);
});


tags.forEach(tag => {
  skeletons.forEach(skeleton => {
    if (skeleton._id === tag.skeleton) {
      skeleton.tags.push(tag._id);
    }
  })
})



// Connect to MongoDB
  
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users and tweets...");

  Skeleton.collection.drop()
                  .then(() => User.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Skeleton.insertMany(skeletons))
                  .then(() => Comment.collection.drop())
                  .then(() => Comment.insertMany(comments))
                  .then(() => Like.collection.drop())
                  .then(() => Like.insertMany(likes))
                  .then(() => Bone.collection.drop())
                  .then(() => Bone.insertMany(bones))
                  .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                  })
                  .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                  });
}


