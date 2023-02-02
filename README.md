![Exquis Splash](./frontend/src/assets/read-me/Exquis%20Splash.png)

## Exquis
Exquis is a collaborative story-telling app, where users can create “skeletons” and add collaborators, who take turns adding “bones” to the skeleton.

***
[Exquis Live Link](https://exquis.onrender.com/ "Exquis")

Exquis is inspired by the surrealist technique known as “exquisite corpse,” where participants take turns adding piece by piece to a dynamic, evolving collective art piece. At Exquis we believe more minds = more fun. Watch your skeletons grow and unfold into unpredictable and unique writing pieces of art. Build beautiful stories and experiences with friends, or build friendships by creating art together.


### Technologies used

Exquis was developed using: 
* Backend: Node.js and Express.js 
* Database: MongoDB, Mongoose
* Frontend: React/Redux, CSS3 and HTML5

### Featured Features

#### Create Skeletons 
![](https://github.com/remnantsofred/exquis/blob/main/frontend/src/assets/readme-videos/create-skeleton-large.gif)

#### Create Bones in a skeleton
![](https://github.com/remnantsofred/exquis/blob/main/frontend/src/assets/readme-videos/create-bone-large.gif)

#### Comment on a skeleton. Likes and dislike a skeleton
![](https://github.com/remnantsofred/exquis/blob/main/frontend/src/assets/readme-videos/likes-comments-large.gif)

#### Edit a skeleton
![](https://github.com/remnantsofred/exquis/blob/main/frontend/src/assets/readme-videos/Large-new-edit-skeleton.gif)


### Color Mapping Bones
 
 #### Code Runthrough:
 ``` jsx
 // /frontend/src/components/Skeletons/SkeletonDisplay/SkeletonShow/CollaboratorColorMatch/CollaboratorColorMatch.jsx

//  this is just a quick shuffle function for the array of palettes, which each palette is also an array
  const shuffle = ([...arr]) => {
    let length = arr.length;
    while (length) {
      const i = Math.floor(Math.random() * length--);
      [arr[length], arr[i]] = [arr[i], arr[length]];
    }
    return arr;
  };

  const palettes = shuffle(unshuffledPalettes)

//  this picks a random color from each palette array
  const randomColor = (array) => {
    return (array[Math.floor((Math.random() * (array.length)))])
  };  

  const ColorAuthorArray = [] // this gets an array of an author mapped to a color

  for (var i = 0; selected.length < collaborators.length; i++) {
    if (i === palettes.length) {i = 0}
    var selectedColor = randomColor(palettes[i])
    if (!selected.includes(selectedColor)) {
      selected.push(selectedColor)
    } else {
    while (!selected.includes(selectedColor)) {
      selectedColor = randomColor(palettes[i])
    }
      selected.push(selectedColor)
    }
  }

  for (var j = 0; j < selected.length; j++) {
    const author = collaborators[j]._id;
    const color = selected[j];
    ColorAuthorArray.push({
      author: author,
      color: color
    })
  }

// /frontend/src/components/Skeletons/SkeletonDisplay/SkeletonShow/CollaboratorsListMap.jsx

// this is the panel for the collaborators on the side, where each name corresponds to the bones they wrote
// each name also is a link to their respective profile pages
  const listie = []

  skellie.collaborators.forEach((collaborator) => {
    const colorObj = colorArr.find(color => color.author === collaborator._id)
    const color = colorObj.color
    listie.push(
    <Link to={`/users/${collaborator._id}`} className="skeleton-show-profile-link" key={`collab-link-${skellie._id}-${collaborator._id}`}>
      <h2 style={{color: `${color}`}}> {collaborator.username} </h2>
    </Link>
  )
  })

// /frontend/src/components/Skeletons/SkeletonDisplay/SkeletonShow/CollaboratorsListMap.jsx
    <ul className="collaborators-list">
      <CollaboratorsListMap colorArr={colorArr} skellie={skellie} />
    </ul>

//frontend/src/components/Skeletons/SkeletonDisplay/SkeletonShow/PlaceBones.jsx

// this is the mechanism that places each sentence (or bone) that each author 
// wrote with their respective colors and in order

  const PlaceBones = ({colorArr, skellie}) => {
    const [loaded, setLoaded] = useState(false)
    const body = []
    const bones = skellie.bones

    const findColor = (bone) => {
      const collaborator = bone.author._id
      const colorObj = colorArr.find(color => color.author === collaborator)
      const color = colorObj.color
      return (
        color
      )
    }
    
    const compileBones = () => {
      for (var i = 0; i < bones.length; i ++) {
        const color = findColor(bones[i])
        let sentence = <span style={{color: `${color}`}}> {bones[i].text} key={`compile-bones-${bones[i]._id}`}</span> 
        body.push(sentence)
      }
      return (
        body
      )
    }

    return (
      compileBones()
    )
  }

// frontend/src/components/Skeletons/SkeletonDisplay/SkeletonShow/CurrentCollaboratorFxn.jsx

// this function also ensures that the same colors are used for each user in the skeleton, while also
// tracking the current collaborator
  function CurrentCollaboratorFxn ({skellie, collaborators}) {
 
  const roundAmt = collaborators.length
  const currentRounds = skellie.bones.length
  
  const currentAmount = () => {
    let baseNum
    if (currentRounds === 0) {
      baseNum = 0
      return (baseNum)
    } else if (currentRounds < roundAmt) {
      baseNum = roundAmt - currentRounds
      return (baseNum);
    } else {
      baseNum = currentRounds % roundAmt;
      return (baseNum);
    }
  }
    const turnNum = currentAmount()
    return (collaborators[turnNum])
  }

// /frontend/src/components/Skeletons/SkeletonDisplay/SkeletonShow/SkeletonShow.jsx
  const collaborators = [skellie.owner].concat(Object.values(skellie.collaborators))
  const colorArr = CollaboratorColorMatch(collaborators)
  const ownerId = skellie.owner._id
  const ownerColor = ownerColorFxn(ownerId, colorArr)
  const prompt = therePrompt(skellie)
  const CurrentCollaboratorObj = CurrentCollaboratorFxn({skellie: skellie, collaborators: collaborators})

  const CurrentCollaboratorColor = (collaborator) => {
      const colorObj = colorArr.find(color => color.author === collaborator)
      const color = colorObj.color
      return (
        color
      )
  }
```

 #### Code Explanation/Thoughts:

The initial challenge was to accurate map each sentence to an author in a separate component by color, and have that be consistent. The challenge was getting random, unique colors for each sentence and owner, which I ended up solving by first creating an array of palettes. Each palette is an array of five unique colors. The array of palettes are shuffled each time before assignment. An array of the collaborators of the relevant skeleton is passed in and then each writer is assigned a color. Then the writer and color are put into an object and pushed into an array that is returned to the skeleton show page, where then it's passed again with the skeleton bones into a Place Bones function which, takes the author id of each bone and connects it with the writer id, confirms that they're the same, then pushes a span element with the color style into an array which is then pushed as the full body of the skeleton back to the skeleton show page.

## Feature 2 - Edit Skeleton from Profile Page

A second feature to highlight is the ability to edit skeletons you own from the user profile page. From the Skeleton show page, it was fairly simple to write out the logic for the edit modal form to have all the existing information about the skeleton pre-populated. 

The user profile page, on the other hand, includes all the skeletons the user is an owner of (meaning a user is able to edit) and collaborator on (collaborators are not given edit access). The user profile page also has three tabs for different collections of skeletons - Current Skeletons (skeletons the user is owner or collaborator on that still have bones remaining and therefore have not been completed), Owned Skeletons (skeletons the user is the owner of, regardless of complete or incomplete status), and Previous Skeletons (skeletons the user is owner or collaborator that have reached max bones and have been completed). 

When we initially ported over the edit modal form functionality from the Skeleton show page, the edit modal did not know which skeleton was being passed in. To correct this issue and to ensure the correct skeleton's information was pre-populating the correct skeleton's information into the edit form modal, we updated refactored the code such that each skeleton of each tab had an assciated modal that would open if the modalStatus was set to the tab name + skeleton id. We then had an onClick function that would set the modal status to the tab and skeleton id. 


### Code snippet below:
```jsx
  const handleSkellieUpdate = (skellie, e, tab) => {
    e.preventDefault()
    setModalStatus(`${tab}-${skellie._id}`)
  }

  const handleSkellieDelete = (skellie, e) => {
    e.preventDefault()
    dispatch(deleteSkeleton(skellie._id))
    setDeleted(true)
  }

  const handleModalClose = () => {
    setModalStatus('')
  }

  const SkellieShowLink = (skellie, switchValue) => {
    if (switchValue === 'current') {
    return (
      <li key={`skellie-show-${skellie._id}`} className="profile-page-skellie-show-link-profile-page">
        <Link className="profile-page-skellie-show-link-profile-page" id="specific-skellie-link" to={`/skeletons/${skellie._id}`}>{skellie.title}</Link><span id="bone-counter">{`  -  ${skellie.bones.length} / ${skellie.maxBones} Bones`}</span>
        <div className="edit-delete-div-profile-page">
          { (sessionUser._id === skellie.owner ) && <button className="comment-update-button" onClick={(e) => handleSkellieUpdate(skellie, e, 'current')}>Edit</button>}
          { (sessionUser._id === skellie.owner ) && <button className="comment-delete-button" onClick={(e) => handleSkellieDelete(skellie, e)}>Delete</button> } 
        </div>
        <hr className="profile-skellie-sep"/>
      </li>
    )} else if (switchValue === 'owned') {
    return (
      <li key={`skellie-show-${skellie._id}`} className="profile-page-skellie-show-link-profile-page"> 
        <Link className="profile-page-skellie-show-link-profile-page" id="specific-skellie-link" to={`/skeletons/${skellie._id}`}>{skellie.title}</Link>{ (skellie.bones.length >= skellie.maxBones) ? <span id="bone-counter">- FINISHED</span> : <span id="bone-counter">{`  -  ${skellie.bones.length} / ${skellie.maxBones} Bones`}</span>}
        
        <div className="edit-delete-div-profile-page">
          { (sessionUser._id === skellie.owner && skellie.bones.length < skellie.maxBones) && <button className="comment-update-button" onClick={(e) => handleSkellieUpdate(skellie, e, 'owned')}>Edit</button>}
          { (sessionUser._id === skellie.owner && skellie.bones.length < skellie.maxBones) && <button className="comment-delete-button" onClick={(e) => handleSkellieDelete(skellie, e)}>Delete</button>} 
        </div>
        <hr className="profile-skellie-sep"/>
      </li>
    )} else {
      return (
        <li key={`skellie-show-${skellie._id}`} className="profile-page-skellie-show-link-profile-page"> 
          <Link className="profile-page-skellie-show-link-profile-page" id="specific-skellie-link" to={`/skeletons/${skellie._id}`}>{skellie.title}</Link><span id="bone-counter">- FINISHED</span>
          <hr className="profile-skellie-sep"/>
        </li>
      )
    }
  }



  const skelliesCurrent = [];
  const skelliesOwned = [];
  const skelliesPrevious = [];


  for (let i = 0; i < skellies?.length; i++) {
    let skellie = skellies[i]
    if (skellie.owner === userId) {
      skelliesOwned.push(skellie)
    }
  }
  

  for (let i = 0; i < skellies?.length; i++) { 
    let skellie = skellies[i]
    if (skellie.collaborators.map((collaborator)=>collaborator._id).includes(userId) || (skellie.owner === userId)) {
      if ( skellie.bones.length < skellie.maxBones) {
        skelliesCurrent.push(skellie)
      } else {
        skelliesPrevious.push(skellie)
      }
    }
  }


  switch(switchValue) {
    case "current":
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
            {!skelliesCurrent.length  
            ? <div className="skellie-show-link-profile-page">No current skeletons</div> 
            : (skelliesCurrent.map((skellie) => (
              <div  key={`current-${skellie._id}`}>  
                {SkellieShowLink(skellie, switchValue)}
                {modalStatus === `current-${skellie._id}` && <SkeletonEditModalProfile skellie={skellie} handleModalClose={handleModalClose} handleSkellieUpdate={handleSkellieUpdate} modalStatus={modalStatus} />}
              </div>
            )))}
          </ul>
        </div>
      )
    case "owned":
      return (
        <div className='skeletons-block' id="owned-skeletons-block">
        <h2 className='profile-bottom-title'>Owned Skeletons</h2>
          <ul className='skeletons-block-list' id="owned-skeletons-block-list">
            {/* {skelliesOwned} */}
            {(!skelliesOwned.length)
            ? <div className="skellie-show-link-profile-page">No owned skeletons
                <Link to={"/skeletons/new"}>
                  <p className="skellie-show-link-profile-page">Start making one here!</p>
                </Link>
              </div> 
            : (skelliesOwned.map((skellie) => (
              <div key={`owned-${skellie._id}`}>  
                {SkellieShowLink(skellie, switchValue)}
                {modalStatus === `owned-${skellie._id}` && <SkeletonEditModalProfile skellie={skellie} handleModalClose={handleModalClose} handleSkellieUpdate={handleSkellieUpdate} modalStatus={modalStatus} />}
              </div>
            )))}
          </ul>
        </div>
      )
    case "previous":
      return (
        <div className='skeletons-block' id="previous-skeletons-block">
        <h2 className='profile-bottom-title'>Previous Skeletons</h2>
          <ul className='skeletons-block-list' id="previous-skeletons-block-list">
            {!skelliesPrevious.length
            ? <p className="skellie-show-link-profile-page">No previous skeletons</p> 
            : (skelliesPrevious.map((skellie) => (
              <div  key={`prev-${skellie._id}`}>  
                {SkellieShowLink(skellie, switchValue)}
              </div>
            )))}
          </ul>
        </div>
      )
    default:
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
          {skelliesCurrent === [] 
            ? <div className="skellie-show-link-profile-page">No current skeletons</div> 
            : (skelliesCurrent.map((skellie) => (
              <div key={`skellie-tab-div-${skellie._id}`}>  
              <SkellieShowLink skellie={skellie} switchValue={switchValue} />
              </div>
            )))}
          </ul>
        </div>
      )
  }


```


