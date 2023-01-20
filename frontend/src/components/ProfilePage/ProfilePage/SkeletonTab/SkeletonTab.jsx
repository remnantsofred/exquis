import { Link } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import getSkeletons from "../../../../store/skeletons";
import { useEffect } from "react";


const SkeletonTab = ({switchValue, skellies, userId}) => {

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
    if (skellie.collaborators.includes(userId)) {
      if ( skellie.bones.length < skellie.maxBones) {
        skelliesCurrent.push(skellie)
      } else {
        skelliesPrevious.push(skellie)
      }
    }
  }
  
  switch(switchValue.switchValue) {
    case "current":
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
            {skelliesCurrent === [] 
            ? <div>No current skeletons</div> 
            : (skelliesCurrent.map((skellie) => (
              <li>{skellie.title}</li>
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
            {skelliesOwned === [] 
            ? <div>No current skeletons</div> 
            : (skelliesOwned.map((skellie) => (
              <li>{skellie.title}</li>
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
            {skelliesPrevious === [] 
            ? <div>No current skeletons</div> 
            : (skelliesPrevious.map((skellie) => (
              <li>{skellie.title}</li>
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
            ? <div>No current skeletons</div> 
            : (skelliesCurrent.map((skellie) => (
              <li>{skellie.title}</li>
            )))}
          </ul>
        </div>
      )
  }
}

export default SkeletonTab;