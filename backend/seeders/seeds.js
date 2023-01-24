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

users.push(
  new User ({
    username: 'Artemis',
    email: 'artemis@goddess.cat',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'Momo',
    email: 'momo@goddess.cat',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'Ashy',
    email: 'ashy@goddess.cat',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'Kenny',
    email: 'kenny@computerwhiz.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)


users.push(
  new User ({
    username: 'Daphne',
    email: 'daphne@computerwhiz.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'Andrea',
    email: 'andrea@computerwhiz.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    username: 'Nathan',
    email: 'nathan@computerwhiz.com',
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
const artie = users[1]
const momo = users[2]
const ashy = users[3]
const kenny = users[4]
const daphne = users[5]
const andrea = users[6]
const nathan = users[7]


// Randomly select an owner
const random = Math.floor(Math.random() * NUM_SEED_USERS)
const ownerId = users[random]._id


// Seed skeletons
const skeletons = [];

const catFightSkellie = new Skeleton({
  owner: momo._id, 
  title: "Meow mrrp meow.",
  prompt: "purr meow meow meow.",
  maxBones: 20,
  maxCollabrators: 10,
  collaborators: [artie._id, ashy._id],
  bones: [],
  tags: [],
  likes: [],
  comments: []
})

skeletons.push(catFightSkellie)

const cat1 = new Bone ({
      text: "meow meow meow? meow, meow mew meow meow...",
      skeleton: skeletons[0]._id,
      author: momo
  });

skeletons[0].bones.push(cat1)

const cat2 = new Bone ({
      text: "meow meow!! meow, meow mew meow meow...???",
      skeleton: skeletons[0]._id,
      author: artie
  });
  
skeletons[0].bones.push(cat2)

const cat3 = new Bone ({
      text: "meow. meow, meow mew meow meow -- meow.",
      skeleton: skeletons[0]._id,
      author: ashy
  });
  
skeletons[0].bones.push(cat3)

const cat4 = new Bone ({
      text: "meow. meow, meow mew meow meow -- meow meow. mew.",
      skeleton: skeletons[0]._id,
      author: momo
  });

skeletons[0].bones.push(cat4)

const cat5 = new Bone ({
      text: "*HISS* meow, meow mew meow meOW!!!",
      skeleton: skeletons[0]._id,
      author: artie
  });
  
skeletons[0].bones.push(cat5)

const cat6 = new Bone ({
      text: "meow. Meow, meow mew meow MEOW meow.",
      skeleton: skeletons[0]._id,
      author: ashy
  });
  
skeletons[0].bones.push(cat6)

const demoOne = new Skeleton({
  owner: daphne._id, 
  title: "The Last Supper",
  prompt: "Joyce enjoyed eating pancakes with ketchup.",
  maxBones: 20,
  maxCollabrators: 2,
  collaborators: [nathan._id],
  bones: [],
  tags: [],
  likes: [],
  comments: []
})

skeletons.push(demoOne)

const bone1 = new Bone ({
      text: "She closed her eyes as she savored her last bite.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone1)

const bone2 = new Bone ({
      text: "The executioner and prison warden were both incredibly astounded that she chose this as her last meal.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone2)

const bone3 = new Bone ({
      text: "But strange as it was, it was not the most strange request they had seen.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone3)

const bone4 = new Bone ({
      text: "The strangest request they'd seen had come from a baby-faced murderer, who had requested something so unspeakably strange and impossibly bizarre.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone4)

const bone5 = new Bone ({
      text: "The executioner shuddered to think of that day, that murderer, that execution.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone5)

const bone6 = new Bone ({
      text: "The executioner still viciously flinched every time he heard their horrid, horrid name, even mentioned in passing: Roundy Bottom Baby Legs.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone6)

const bone7 = new Bone ({
      text: "He sighed and checked his Meat-Up app as a distraction.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone7)

const bone8 = new Bone ({
      text: "What was he in the mood for: a steak, a hot dog, perhaps a lamb chop?",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone8)

const bone9 = new Bone ({
      text: "As he scrolled through he started to feel ashamed at himself for thinking of food at this time and then grimaced and he shoved his phone back into his pocket.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone9)

const bone10 = new Bone ({
      text: "Unceremoniously, he sighed thinking of tender meats, waiting for Joyce to be strapped into the electric chair - a vile, and honestly antiquated mode of execution they had no choice, but to adopt due to budget cuts.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone10)

const bone11 = new Bone ({
      text: "The worst part was the smell, that slight metallic singe to the air.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone11)

const bone12 = new Bone ({
      text: "Not dissimilar to shawarma, ah yes, he dreamed of warm shawarma on a pita with fresh cucumbers and yogurt...",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone12)

const bone13 = new Bone ({
      text: "He let his mind drift off back to meat; this was his coping mechanism.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone13)

const bone14 = new Bone ({
      text: "It started as a child, where he often cooked meaty meals with his mammalian main man, Murphy, a medium-sized mouse who sat on his head.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone14)

const bone15 = new Bone ({
      text: "Murphy was mostly mild-mannered but would jump up and down in excitement if he spiced the meats just right.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone15)

const bone16 = new Bone ({
      text: "Murphy had a predilection toward cumin and dill in particular, often favoring Middle-Eastern cuisine.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone16)

const bone17 = new Bone ({
      text: "He was even partial to sneakily taking cumin dust baths, he really couldn't get enough cumin.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone17)

const bone18 = new Bone ({
      text: "He was usually not so sneaky, as the spice would seep and stain his fur, usually accompanied by shrill bouts of small sneezes.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone18)

const bone19 = new Bone ({
      text: "This would attract the attention of his best friend, the cat Miso, who would come over and groom Murphy back to squeaky clean.",
      skeleton: skeletons[1]._id,
      author: daphne
  });

skeletons[1].bones.push(bone19)

const bone20 = new Bone ({
      text: "This brought the executioner back to the present moment, as Miso had, on accident, opened her mouth too large in grooming and had swallowed Murphy whole -- he thought of this as Joyce not only took her last bite, but her last breath.",
      skeleton: skeletons[1]._id,
      author: nathan
  });

skeletons[1].bones.push(bone20)


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
      user.comments.push(comment);
    }
  })
})

comments.forEach(comment => {
  skeletons.forEach(skeleton => {
    if (skeleton._id === comment.parent) {
      skeleton.comments.push(comment);
    }
  })
})


// Seed likes
//TODO: change this so it's not a random user because a user can only like/dislike a skellie once
const likes = [];

for (const skeleton of skeletons) {
  
  for (let i = 0; i < NUM_SEED_LIKES; i++) {
    const like = new Like ({
      skeleton: skeleton._id,
      liker: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      type: faker.helpers.arrayElement(["like", "dislike", "like", "like", "like"]) //[1, -1, 1, 1, 1, -1, -1]
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

skeletons.slice(2).forEach(skeleton => {
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
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  Skeleton.collection.drop()
                  .then(() => User.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Skeleton.insertMany(skeletons.reverse()))
                  .then(() => Comment.collection.drop())
                  .then(() => Comment.insertMany(comments))
                  .then(() => Like.collection.drop())
                  .then(() => Like.insertMany(likes))
                  .then(() => Bone.collection.drop())
                  .then(() => Bone.insertMany(bones))
                  .then(() => {
                   mongoose.disconnect();
                  })
                  .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                  });
}


