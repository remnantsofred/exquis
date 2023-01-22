import { Link } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { getSkeletons , fetchSkeletons } from "../../../../store/skeletons";
import { useEffect, useState } from "react";


const SkeletonTab = ({switchValue, skellies, userId}) => {

  const isCurrent = (skellie) => {
    if (skellie.bones.length < skellie.maxBones) {
      return (true)
    } else {
      return (false)
    }
  };

  const SkellieShowLink = (skellie) => {
    if (isCurrent(skellie)) {
    return (
      <li key={skellie._id} className="skellie-show-link-profile-page">
        <Link className="skellie-show-link-profile-page" id="specific-skellie-link" to={`/skeletons/${skellie._id}`}>{skellie.title}</Link><span id="bone-counter">{`  -  ${skellie.bones.length} / ${skellie.maxBones} Bones`}</span>
        <hr class="profile-skellie-sep"/>
      </li>
    )} else {
    return(
      <li className="skellie-show-link-profile-page"> 
        <Link className="skellie-show-link-profile-page" id="specific-skellie-link" to={`/skeletons/${skellie._id}`}>{skellie.title}</Link>{` // FINISHED`}  
        <hr class="profile-skellie-sep"/>
      </li>
    )}
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
    if (skellie.collaborators.includes(userId) || (skellie.owner === userId)) {
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
              SkellieShowLink(skellie)
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
              SkellieShowLink(skellie)
            )))}
          </ul>
        </div>
      )
    case "previous":
      return (
        <div className='skeletons-block' id="previous-skeletons-block">
        <h2 className='profile-bottom-title'>Previous Skeletons</h2>
          <ul className='skeletons-block-list' id="previous-skeletons-block-list">
            {/* {skelliesPrevious} */}
            {!skelliesPrevious.length
            ? <p className="skellie-show-link-profile-page">No previous skeletons</p> 
            : (skelliesPrevious.map((skellie) => (
              <SkellieShowLink skellie={skellie} />
            )))}
          </ul>
        </div>
      )
    default:
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
          {/* {skelliesCurrent} */}
          {skelliesCurrent === [] 
            ? <div className="skellie-show-link-profile-page">No current skeletons</div> 
            : (skelliesCurrent.map((skellie) => (
              <SkellieShowLink skellie={skellie} />
            )))}
          </ul>
        </div>
      )
  }
}

export default SkeletonTab;