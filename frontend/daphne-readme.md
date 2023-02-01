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