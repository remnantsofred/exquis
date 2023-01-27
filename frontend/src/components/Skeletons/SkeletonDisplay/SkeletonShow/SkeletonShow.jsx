import { useParams, useHistory, Link } from "react-router-dom"
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
import { createLike, deleteLike } from "../../../../store/likes"

const SkeletonShow = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [comment, setComment] = useState('');
  const history = useHistory();
  const { skeletonId } = useParams()
  const skellie = useSelector(getSkeleton(skeletonId))
  let skeleton = skellie;
  const author = SessionUserCheck();
  const [ modalStatus, setModalStatus ] = useState(false);
  const currentUser = useSelector(state => state.session.user)
  const [votes, setVotes] = useState([]);
  const [voteCount, setVoteCount] = useState(0)
  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)

  useEffect(() => {
    setVotes(skellie?.likes)
  })

  useEffect(() => {
    setVoteCount(votes?.length)
  }, [votes])

  const setUpVoteOrDownVote = () => {
    if (votes?.length > 0) {
      votes.forEach((vote) => {
        if (vote.liker._id === currentUser._id) {
          if (vote.type === 'like') {
            setUpVote(true)
          } else {
            setDownVote(true)
          }
        }
      })
    }
  }

   useEffect(() => {
    setUpVoteOrDownVote()
  })

    
  
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

  const handleUpVote = (e) => {

    e.preventDefault()
    if (currentUser) { 
      if (downVote) {
        dispatch(deleteLike(skeleton._id, currentUser._id))
        setDownVote(false)
        setVoteCount(voteCount => voteCount - 1)
        const like = {type: 'like', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id))
        setUpVote(true)
        setVoteCount(voteCount => voteCount + 1)
      } else {
        if (!upVote) {
          const like = {type: 'like', skeleton: skeleton._id, liker: currentUser._id }
          dispatch(createLike(like, skeleton._id))
          setUpVote(true)
          setVoteCount(voteCount => voteCount + 1)
        } else {
          dispatch(deleteLike(skeleton._id, currentUser._id))
          setUpVote(false)
          setVoteCount(voteCount => voteCount - 1)
        }
      }
    }
  }



  const handleDownVote = (e) => {
    e.preventDefault()

    if (currentUser) {
      if (upVote) {
        dispatch(deleteLike(skeleton._id, currentUser._id))
        setUpVote(false)
        setVoteCount(voteCount => voteCount - 1)
        const like = {type: 'dislike', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id))
        setDownVote(true)
        setVoteCount(voteCount => voteCount + 1)
      } else {
        if (downVote) {
          dispatch(deleteLike(skeleton._id, currentUser._id))
          setDownVote(false)
          setVoteCount(voteCount => voteCount - 1)
        } else {
          const like = {type: 'dislike', skeleton: skeleton._id, liker: currentUser._id }
          dispatch(createLike(like, skeleton._id))
          setDownVote(true)
          setVoteCount(voteCount => voteCount + 1)
        }
      }  
    }
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
    // const likeCount = skeleton.likes.length
    // const CurrentLikeCount = likeCount + upVoteCount
    const completeChecker = (bones, maxBones) => {
      if (bones.length >= maxBones) {
        return true
      } else {
        return false
      }
    }

    const CurrentCollaboratorColor = (collaborator) => {
        const colorObj = colorArr.find(color => color.author === collaborator)
        const color = colorObj.color
        return (
          color
        )
    }

    return (
      <>
        {modalStatus === 1 && <SkeletonEditModal skellie={skellie} handleModalClose={handleModalClose} handleSkellieUpdate={handleSkellieUpdate} modalStatus={modalStatus} />}
        <div className="skellie-main-container">
          <div className="show-top-middle">
            <div className="show-top">
                <div className="title-user-edit">
                <h1 id="skeleton-title">{skellie.title} ///// <span id="bone-counter-in-title">({skellie.bones.length} / {skellie.maxBones} Bones)</span></h1>
                { (author._id === skellie.owner._id ) ? <hr id="edit-delete-title-divider" /> : <></>} 

                  <div className="edit-delete-div">
                  { (author._id === skellie.owner._id ) ? <button className="comment-update-button" onClick={handleSkellieUpdate}>Edit</button> : <></>}
                  { (author._id === skellie.owner._id ) ? <button className="comment-delete-button" onClick={handleSkellieDelete} >Delete</button> : <></>} 
                  </div>
                  
                </div>
                  <div className="sub-title">
                    <Link to={`/users/${skellie.owner._id}`} className="skeleton-show-profile-link">
                      <h3 id="skeleton-owner" style={{color: `${ownerColor}`}}>{skellie.owner.username}</h3>
                    </Link>
                    <h3 id="skeleton-prompt"><span id="name-prompt-divider">/////</span> prompt: "{prompt}"</h3>
                  </div>
                <hr />
            </div>
            <div className="show-middle">
                <div className="skeleton-body-input-container">
                    <div id="skeleton-body">
                      <NewPlaceBones skellie={skellie} colorArr={colorArr} />
                    </div> 
                      <div className="user-input-div" style={{display: completeChecker(skellie.bones, skellie.maxBones) ? "block" : "none" }}>
                        <div id="current-writer-note" >
                            <span>The bone limit has been reached.</span>
                        </div>
                      </div>

                      <div className="user-input-div" style={{display: completeChecker(skellie.bones, skellie.maxBones) ? "none" : "block" }}>
                        <hr id="body-input-divider" />
                        <div id="current-writer-note" >
                            <span>It is</span>    
                              <Link to={`/users/${CurrentCollaboratorObj._id}`} className="skeleton-show-profile-current-collab-link" id="skeleton-show-current-collab-text" style={{color: `${CurrentCollaboratorColor(CurrentCollaboratorObj._id)}`}}>
                                <span id="current-writer-username">
                                  {`${CurrentCollaboratorObj.username}`}'s
                                </span>
                              </Link>
                            <span>turn.</span>
                        </div>
                        {(CurrentCollaboratorObj && author) && <NewBoneInput skellie={skellie} currentCollabId={CurrentCollaboratorObj._id} authorId={author._id}/>}
                      </div>
                      <div className="horizontal-skeleton-likes-container">
                        <button onClick={handleDownVote} className="skeleton-show-downvote"><DownvoteButton className="skeleton-show-downvote" /></button>
                          <h1 id="skeleton-show-votes">{voteCount}</h1>
                          {/* <h1 id="skeleton-show-votes">{votes}</h1> */}
                        <button onClick={handleUpVote} className="skeleton-show-upvote"><UpvoteButton className="skeleton-show-upvote"/></button>
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
          <h2 htmlFor="comment" id="comment-section-label">{skellie.comments.length === 1 ? `${skellie.comments.length} Comment` : `${skellie.comments.length} Comments`}</h2>
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


