import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSkeleton, fetchSkeleton, updateSkeleton, deleteSkeleton } from '../../../../store/skeletons'
import { getBones, fetchBones } from '../../../../store/bones'
import Loading from "../../../Loading/Loading"
import PlaceBones from "./PlaceBones"
import DownvoteButton from "../../DownvoteButton"
import UpvoteButton from "../../UpvoteButton"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"
import NewBoneInput from "./NewBoneInput/NewBoneInput"
import CommentForm from "./CommentForm/CommentForm"
import CommentPanel from "./CommentPanel/CommentPanel"
import { createComment } from "../../../../store/comments"
import "./SkeletonShow.css"
import {getCommentsForSkeleton} from "../../../../store/skeletons"
import { fetchSkeletonComments } from "../../../../store/comments"
import GenSkeletonTile from "../../SkeletonTile/GenSkeletonTile/GenSkeletonTile"
import { fetchUsers, getUser } from "../../../../store/users"
import SessionUserCheck from "../../../SessionUserCheck/SessionUserCheck"

const SkeletonShow = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [comment, setComment] = useState('');
  const history = useHistory();
  const { skeletonId } = useParams()
  const skellie = useSelector(getSkeleton(skeletonId))
  // const bones = useSelector(state => state.bones)
  const author = useSelector(state => state.session.user);
  const user = SessionUserCheck()


  const handlePost = (e) => {
    e.preventDefault();
    const newComment = {"author": author._id, "text": comment, "parent": skeletonId}

    dispatch(createComment(newComment, skeletonId));
    e.target.value = "";
    setComment("");
  };

  const currentCollaborator = 'nathan, the wondrous'


  useEffect(() => {
    Promise.all([
      dispatch(fetchSkeleton(skeletonId)),
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])

  const handleSkellieUpdate = (e) => {
    e.preventDefault()
    // dispatch(updateSkeleton(skeletonId))
  }

  const handleSkellieDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSkeleton(skeletonId))
    .then((res) => {history.push(`/users/${skellie.owner._id}`)})
  }

  if (!loaded) {
    return (
      <Loading />
    )
  } else if (loaded && skellie) {
    return (
      <>
        <div className="skellie-main-container">
          
          <div className="show-top-middle">
            <div className="show-top">
              { (user._id === skellie.owner._id ) ? <button className="comment-update-button" onClick={handleSkellieUpdate}>Edit</button> : <></>}
              { (user._id === skellie.owner._id ) ? <button className="comment-delete-button" onClick={handleSkellieDelete} >Delete</button> : <></>} 
              <h1 id="skeleton-title">{skellie.title}</h1> 
                <hr />
                  <div className="sub-title">
                    <h3 id="skeleton-owner">{skellie.owner.username}</h3>
                    <h3 id="skeleton-prompt">"{skellie.prompt}"</h3>
                  </div>
                <hr />
            </div>
            <div className="show-middle">
              {/* TODO: 01/17/2023 - We can separate out the body by each bone and map out colors to the owners */}
                <div className="skeleton-body-input-container">
                    <div id="skeleton-body">
                      <PlaceBones component={loaded ? skellie.bones : []} />
                    </div> 
                      <div className="user-input-div">
                        <hr id="body-input-divider" />
                        <div id="current-writer-note" >
                            <span>It is</span><span id="current-writer-username">{`${currentCollaborator}`}'s</span><span>turn.</span>
                        </div>
                        {/* TODO - 01/18/2023 - we could disable or erase this panel depending on if it matches w current user */}
                        <NewBoneInput skellie={skellie} />
                      </div>
                      <div className="horizontal-skeleton-likes-container">
                        <DownvoteButton id="skeleton-show-downvote" />
                          <h1 id="skeleton-show-votes">{skellie.likes.length}</h1>
                        <UpvoteButton id="skeleton-show-downvote"/>
                      </div>
                </div>
            </div>
          </div>
            <div className="collaborator-panel">
              <div className="collaborator-panel-text">
                <h2>Collaborators</h2>
                <hr />
                  <ul className="collaborators-list">
                    {skellie.collaborators.map(collaborator => <h2 key={collaborator._id}>{collaborator.username}</h2>)}
                  </ul>
              </div>
            </div>
            <br />
        </div>
        <hr id="comment-divider" />

          
        <div className="comments-section">
          <h2 for="comment" id="comment-section-label">Thoughts?</h2>
          <div className='create-comment-container' id="comment-form-container">
            {/* <br /> */}
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


