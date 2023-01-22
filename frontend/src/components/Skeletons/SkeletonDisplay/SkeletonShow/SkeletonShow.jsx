import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSkeleton, fetchSkeleton, updateSkeleton, deleteSkeleton } from '../../../../store/skeletons'
import { getBones, fetchBones } from '../../../../store/bones'
import Loading from "../../../Loading/Loading"
import DownvoteButton from "../../DownvoteButton"
import UpvoteButton from "../../UpvoteButton"
import CollaboratorColorMatch from "./CollaboratorColorMatch/CollaboratorColorMatch"
import CollaboratorsListMap from "./CollaboratorsListMap"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"
import NewPlaceBones from "./PlaceBones"
import NewBoneInput from "./NewBoneInput/NewBoneInput"
import CommentForm from "./CommentForm/CommentForm"
import CommentPanel from "./CommentPanel/CommentPanel"
import { createComment } from "../../../../store/comments"
import SessionUserCheck from "../../../SessionUserCheck/SessionUserCheck"
import "./SkeletonShow.css"
import {getCommentsForSkeleton} from "../../../../store/skeletons"
import { fetchSkeletonComments } from "../../../../store/comments"
import GenSkeletonTile from "../../SkeletonTile/GenSkeletonTile/GenSkeletonTile"
import { fetchUsers, getUser } from "../../../../store/users"
import SkeletonEditModal from "../../SkeletonEditModal/SkeletonEditModal"

const SkeletonShow = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [comment, setComment] = useState('');
  const history = useHistory();
  const { skeletonId } = useParams()
  const skellie = useSelector(getSkeleton(skeletonId))
  // const bones = useSelector(state => state.bones)
  // const author = useSelector(state => state.session.user);
  //const user = SessionUserCheck()
  const author = SessionUserCheck();
  const [ modalStatus, setModalStatus ] = useState(false);


  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  const handlePost = (e) => {
    e.preventDefault();
    const newComment = {"author": author._id, "text": comment, "parent": skeletonId}

    dispatch(createComment(newComment, skeletonId));
    e.target.value = "";
    setComment("");
  };


  const ownerColorFxn = (owner, colorArr) => {
    const colorObj = colorArr.find(color => color.author === owner)
    return (
      colorObj.color
    )
  }

  const therePrompt = (skellie) => {
    if (!skellie.prompt) {
      return (
      <span>'n/a'</span>
    )} else {
      return (
        <span>{skellie.prompt}</span>
      )
    }
  }



  useEffect(() => {
    Promise.all([
      dispatch(fetchSkeleton(skeletonId)),
      dispatch(fetchUsers())
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])


  const handleSkellieUpdate = (e) => {
    e.preventDefault()
    // dispatch(updateSkeleton(skeletonId))
    setModalStatus(1)
  }

  const handleSkellieDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSkeleton(skeletonId))
    .then((res) => {history.push(`/users/${skellie.owner._id}`)})
  }

  const handleModalClose = () => {
    setModalStatus(false)
  }
  
  
  
  if (!loaded) {
    return (
      <Loading />
    )
  } else if (loaded && skellie) {
    
    const collaborators = [skellie.owner].concat(Object.values(skellie.collaborators))
    const colorArr = CollaboratorColorMatch(collaborators)
    const ownerId = skellie.owner._id
    const ownerColor = ownerColorFxn(ownerId, colorArr)
    const prompt = therePrompt(skellie)
    const CurrentCollaboratorObj = CurrentCollaboratorFxn({skellie: skellie, collaborators: collaborators})
    

    return (
      <>
        {modalStatus === 1 && <SkeletonEditModal skellie={skellie} handleModalClose={handleModalClose} handleSkellieUpdate={handleSkellieUpdate} modalStatus={modalStatus} />}
        <div className="skellie-main-container">
          <div className="show-top-middle">
            <div className="show-top">
              { (author._id === skellie.owner._id ) ? <button className="comment-update-button" onClick={handleSkellieUpdate}>Edit</button> : <></>}
              { (author._id === skellie.owner._id ) ? <button className="comment-delete-button" onClick={handleSkellieDelete} >Delete</button> : <></>} 
              <h1 id="skeleton-title">{skellie.title}</h1> 
                <hr />
                  <div className="sub-title">
                    <h3 id="skeleton-owner" style={{color: `${ownerColor}`}}>{skellie.owner.username}</h3>
                    <h3 id="skeleton-prompt">///// prompt: "{prompt}"</h3>
                  </div>
                <hr />
            </div>
            <div className="show-middle">
                <div className="skeleton-body-input-container">
                    <div id="skeleton-body">
                      <NewPlaceBones skellie={skellie} colorArr={colorArr} />

                    </div> 
                      <div className="user-input-div">
                        <hr id="body-input-divider" />
                        <div id="current-writer-note" >
                            <span>It is</span><span id="current-writer-username">{`${CurrentCollaboratorObj.username}`}'s</span><span>turn.</span>
                        </div>
                        {(CurrentCollaboratorObj && author) && <NewBoneInput skellie={skellie} currentCollabId={CurrentCollaboratorObj._id} authorId={author._id}/>}
                      </div>
                      <div className="horizontal-skeleton-likes-container">
                        <DownvoteButton id="skeleton-show-downvote" />
                          <h1 id="skeleton-show-votes">{skellie.likes.length}</h1>
                        <UpvoteButton id="skeleton-show-upvote"/>
                      </div>
                </div>
            </div>
          </div>
            <div className="collaborator-panel">
              <div className="collaborator-panel-text">
                <h2>Collaborators</h2>
                <hr />
                  <ul className="collaborators-list">
                    <CollaboratorsListMap colorArr={colorArr} skellie={skellie} />
                  </ul>
              </div>
            </div>
            <br />
        </div>
        <hr id="comment-divider" />

          
        <div className="comments-section">
          <h2 for="comment" id="comment-section-label">{skellie.comments.length === 1 ? `${skellie.comments.length} Comment` : `${skellie.comments.length} Comments`}</h2>
          <div className='create-comment-container' id="comment-form-container">
            <textarea name="comment" id="comment-input" className="create-comment-form" rows="5" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button type="submit" id="submit-comment-button" className="create-comment-sumbit" onClick={handlePost}>Submit</button>
          </div>
        </div>

        
          <CommentPanel skeleton={skellie} />
    
      </>
    )
  }
}


export default SkeletonShow;


