import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { getSkeletons , fetchSkeletons, deleteSkeleton } from "../../../../store/skeletons";
import { useEffect, useState } from "react";
import SkeletonEditModalProfile from "../../../Skeletons/SkeletonEditModalProfile/SkeletonEditModalProfile"
import { getUsers, fetchUsers, getUser } from "../../../../store/users";
import SessionUserCheck from "../../../SessionUserCheck/SessionUserCheck"

const SkeletonTab = ({switchValue, userId}) => {

  const dispatch = useDispatch()
  const [ modalStatus, setModalStatus ] = useState(false);
  const history = useHistory();
  const sessionUser = SessionUserCheck()
  // const isCurrent = (skellie) => {
  //   if (skellie.bones === []) {
  //     return (true)
  //   } else if (skellie.bones && (skellie.bones.length < skellie.maxBones)) {
  //     return (true)
  //   } else {
  //     return (false)
  //   }
  // };

  const user = useSelector(getUser(userId))
  const skellies = user?.skeletons


  useEffect(() => {
    dispatch(fetchUsers())
  },[])

  const handleSkellieUpdate = (skellie, e, tab) => {
    e.preventDefault()
    // dispatch(updateSkeleton(skeletonId))
    setModalStatus(`${tab}-${skellie._id}`)
  }

  const handleSkellieDelete = (skellie, e) => {
    e.preventDefault()
    dispatch(deleteSkeleton(skellie._id))
    .then((res) => {history.push(`/users/${skellie.owner}`)})
  }

  const handleModalClose = () => {
    setModalStatus('')
  }

  const SkellieShowLink = (skellie, switchValue) => {
    // if (isCurrent(skellie)) {
    if (switchValue === 'current') {
    return (
      <li key={`skellie-show-${skellie._id}`} className="profile-page-skellie-show-link-profile-page">
        <Link className="profile-page-skellie-show-link-profile-page" id="specific-skellie-link" to={`/skeletons/${skellie._id}`}>{skellie.title}</Link><span id="bone-counter">{`  -  ${skellie.bones.length} / ${skellie.maxBones} Bones`}</span>
        <div className="edit-delete-div-profile-page">
          { (sessionUser._id === skellie.owner ) ? <button className="comment-update-button" onClick={(e) => handleSkellieUpdate(skellie, e, 'current')}>Edit</button> : <></>}
          { (sessionUser._id === skellie.owner ) ? <button className="comment-delete-button" onClick={(e) => handleSkellieDelete(skellie, e)} >Delete</button> : <></>} 
        </div>
        <hr className="profile-skellie-sep"/>
      </li>
    )} else {
    return (
      <li key={`skellie-show-${skellie._id}`} className="profile-page-skellie-show-link-profile-page"> 
        <Link className="profile-page-skellie-show-link-profile-page" id="specific-skellie-link" to={`/skeletons/${skellie._id}`}>{skellie.title}</Link>{ (skellie.bones.length >= skellie.maxBones) ? <span id="bone-counter">- FINISHED</span> : <span id="bone-counter">{`  -  ${skellie.bones.length} / ${skellie.maxBones} Bones`}</span>}
        
        <div className="edit-delete-div-profile-page">
          { (sessionUser._id === skellie.owner ) ? <button className="comment-update-button" onClick={(e) => handleSkellieUpdate(skellie, e, 'owned')}>Edit</button> : <></>}
          { (sessionUser._id === skellie.owner ) ? <button className="comment-delete-button" onClick={(e) => handleSkellieDelete(skellie, e)} >Delete</button> : <></>} 
        </div>
        <hr className="profile-skellie-sep"/>
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
            {/* {skelliesPrevious} */}
            {!skelliesPrevious.length
            ? <p className="skellie-show-link-profile-page">No previous skeletons</p> 
            : (skelliesPrevious.map((skellie) => (
              <div  key={`prev-${skellie._id}`}>  
                {SkellieShowLink(skellie, switchValue)}
                {/* {modalStatus === `previous-${skellie._id}` && <SkeletonEditModal skellie={skellie} handleModalClose={handleModalClose} handleSkellieUpdate={handleSkellieUpdate} modalStatus={modalStatus} />} */}
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
          {/* {skelliesCurrent} */}
          {skelliesCurrent === [] 
            ? <div className="skellie-show-link-profile-page">No current skeletons</div> 
            : (skelliesCurrent.map((skellie) => (
              <div key={`skellie-tab-div-${skellie._id}`}>  
              <SkellieShowLink skellie={skellie} switchValue={switchValue} />
              {/* {modalStatus === 1 && <SkeletonEditModal skellie={skellie} handleModalClose={handleModalClose} handleSkellieUpdate={handleSkellieUpdate} modalStatus={modalStatus} />} */}
              </div>
            )))}
          </ul>
        </div>
      )
  }
}

export default SkeletonTab;