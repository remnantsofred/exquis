import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSkeleton, fetchSkeleton, updateSkeleton } from '../../../../store/skeletons'
import { getBones, fetchBones } from '../../../../store/bones'
import Loading from "../../../Loading/Loading"
import PlaceBones from "./PlaceBones"
import DownvoteButton from "../../DownvoteButton"
import UpvoteButton from "../../UpvoteButton"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"

import CommentForm from "./CommentForm/CommentForm"
import CommentPanel from "./CommentPanel/CommentPanel"

import { createComment } from "../../../../store/comments"

import "./SkeletonShow.css"
import CommentPanel from "./CommentPanel/CommentPanel"
import {getCommentsForSkeleton} from "../../../../store/skeletons"
import { fetchSkeletonComments } from "../../../../store/comments"

const SkeletonShow = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [comment, setComment] = useState('');

  const { skeletonId } = useParams()
  const skellie = useSelector(getSkeleton(skeletonId))
  const comments = useSelector((state) => getCommentsForSkeleton(state, skeletonId)) // TODO in order for the comment to show when added w/o page refresh 
  //- need to fix this and correctly get comments and pass them down to comment panel instead of using sklellie.comments
 


  const author = useSelector(state => state.session.user);

  const handlePost = (e) => {
    e.preventDefault();
    const newComment = {"author": author._id, "text": comment, "parent": skeletonId}

    dispatch(createComment(newComment, skeletonId));
    e.target.value = "";
    setComment("");
  };



  const tempBones = [
    "As she sat watching the world go by, something caught her eye.",
    "It wasn't so much its color or shape, but the way it was moving.",
    "She squinted to see if she could better understand what it was and where it was going, but it didn't help.",
    "As she continued to stare into the distance, she didn't understand why this uneasiness was building inside her body.", 
    "She felt like she should get up and run.",
    "If only she could make out what it was.",
    "At that moment, she comprehended what it was and where it was heading, and she knew her life would never be the same."
  ]
  const currentCollaborator = 'nathan, the wondrous'
  const collaborators = ['this knee', 'dare in', 'the eggo', 'tailor', 'ab yee', 'dab-ne', 'and rhea', 'neigh thin']


  useEffect(() => {
    Promise.all([
      dispatch(fetchSkeleton(skeletonId)),
      dispatch(fetchSkeletonComments(skeletonId))
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])


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
            <h1 id="skeleton-title">{skellie.title}</h1>
              <hr />
                <div className="sub-title">
                  <h3 id="skeleton-owner">{skellie.owner.username}</h3>
                  <h3 id="skeleton-prompt">"{skellie.prompt}"</h3>
                </div>
              <hr />
          </div>
                  </div>
          <div className="show-middle">
            {/* TODO: 01/17/2023 - We can separate out the body by each bone and map out colors to the owners */}
            <div className="skeleton-body-input-container">
              <div id="skeleton-body">
                {/* {PlaceBones(skellie.bones)} */}
              <div className="user-input-div">
                <hr id="body-input-divider" />
                <div id="current-writer-note" ><span>It is</span><span id="current-writer-username">{`${currentCollaborator}`}'s</span><span>turn.</span></div>
                {/* TODO - 01/18/2023 - we could disable or erase this panel depending on if it matches w current user */}
                <textarea id="current-collab-input" />
              </div>
              <div className="horizontal-skeleton-likes-container">
                <DownvoteButton />
                  <h1>{skellie.likes.length}</h1>
                <UpvoteButton />
              </div>
            </div>
          </div>
        </div>
          <div className="collaborator-panel">
            <div className="collaborator-panel-text">
              <h2>Collaborators</h2>
              <hr />
                <ul className="collaborators-list">
                  {skellie.collaborators.map(collaborator => <h2>{collaborator.username}</h2>)}
                </ul>
            </div>
          </div>
          <br />
          <div className="show-bottom">
        </div>

        <hr id="comment-divider" />
        <div className="comments-section">
            <CommentForm />
            <CommentPanel />

        </div>
        
      <div className="comments-section">

       < CommentPanel skeletonId={skellie._id} skellie={skellie} comments={skellie.comments}/>

        <div className='create-comment-container'>
          <input className="create-comment-form" type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
          <button className="create-comment-sumbit" onClick={handlePost}>Submit</button>

        </div>
      
      </div>

      </>
    )
  }
}

export default SkeletonShow;


