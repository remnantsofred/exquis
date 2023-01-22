import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSkeleton, fetchSkeleton, updateSkeleton } from '../../../../store/skeletons'
import { getBones, fetchBones } from '../../../../store/bones'
import Loading from "../../../Loading/Loading"
import DownvoteButton from "../../DownvoteButton"
import UpvoteButton from "../../UpvoteButton"
import CollaboratorColorMatch from "./ColorPalettePicker/CollaboratorColorMatch"
import CollaboratorsListMap from "./CollaboratorsListMap"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"
import NewPlaceBones from "./PlaceBones"
import NewBoneInput from "./NewBoneInput/NewBoneInput"

import CommentForm from "./CommentForm/CommentForm"
import CommentPanel from "./CommentPanel/CommentPanel"

import { createComment } from "../../../../store/comments"

import "./SkeletonShow.css"
import {getCommentsForSkeleton} from "../../../../store/skeletons"
import { fetchSkeletonComments } from "../../../../store/comments"
import GenSkeletonTile from "../../SkeletonTile/GenSkeletonTile/GenSkeletonTile"
import { fetchUsers, getUser } from "../../../../store/users"

const SkeletonShow = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [comment, setComment] = useState('');
 
  const { skeletonId } = useParams()
  const skellie = useSelector(getSkeleton(skeletonId))
  const bones = useSelector(state => state.bones)
  const author = useSelector(state => state.session.user);

  // const comments = useSelector((state) => getCommentsForSkeleton(state, skeletonId)) // TODO in order for the comment to show when added w/o page refresh 
  //- need to fix this and correctly get comments and pass them down to comment panel instead of using sklellie.comments
  // const comments = useSelector((state) => getCommentsForSkeleton(state, skeletonId)) // TODO in order for the comment to show when added w/o page refresh 
  //- need to fix this and correctly get comments and pass them down to comment panel instead of using sklellie.comments
 


  // const bones = useSelector(state => state.bones)
 
  // const handlePost = (e) => {
  //   e.preventDefault();
  //   const newComment = {"author": author._id, "text": comment, "parent": skeletonId}

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


  if (!loaded) {
    return (
      <Loading />
    )
  } else if (loaded && skellie) {
    const collaborators = (Object.values(skellie.collaborators)).concat([skellie.owner])
    console.log('skeleton show collaborators', collaborators)
    const colorArr = CollaboratorColorMatch(collaborators)
    console.log('color array????', colorArr)
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
            <div className="show-middle">
              {/* TODO: 01/17/2023 - We can separate out the body by each bone and map out colors to the owners */}
                <div className="skeleton-body-input-container">
                    <div id="skeleton-body">
                      <NewPlaceBones skellie={skellie} colorArr={colorArr} />

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
                    <CollaboratorsListMap colorArr={colorArr} skellie={skellie} />
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
          {skellie.comments.length && skellie.comments.map((comment) => <CommentForm skeletonId={skellie._id} skellie={skellie} comment={comment}/>)}
        {/* </div> */}
      </>
    )
  }
}


export default SkeletonShow;


