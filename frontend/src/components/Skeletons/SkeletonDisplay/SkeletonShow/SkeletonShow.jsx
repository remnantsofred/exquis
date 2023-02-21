import { useParams, useHistory, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSkeleton, fetchSkeleton, updateSkeleton, deleteSkeleton } from '../../../../store/skeletons'
import Loading from "../../../Loading/Loading"
import CollaboratorColorMatch from "./CollaboratorColorMatch/CollaboratorColorMatch"
import CollaboratorsListMap from "./CollaboratorsListMap"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"
import NewPlaceBones from "./PlaceBones"
import NewBoneInput from "./NewBoneInput/NewBoneInput"
import CommentPanel from "./CommentPanel/CommentPanel"
import SetCurrentCollaborator from "./SetCurrentCollaboratorBackend"
import { createComment } from "../../../../store/comments"
import SessionUserCheck from "../../../SessionUserCheck/SessionUserCheck"
import "./SkeletonShow.css"
import { fetchUsers, getUser } from "../../../../store/users"
import SkeletonEditModal from "../../SkeletonEditModal/SkeletonEditModal"
import { createLike, deleteLike } from "../../../../store/likes"
import Downvote from "../../../../assets/skeleton_tile/triangle_button_down.png"
import Upvote from "../../../../assets/skeleton_tile/triangle_button_up.png"
import Downvoted from "../../../../assets/skeleton_tile/triangle_button_down_downvoted.png"
import Upvoted from  "../../../../assets/skeleton_tile/triangle_button_up_upvoted.png"

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
  // const currentUser = useSelector(state => state.session.user)
  const currentUser = SessionUserCheck()
  const [votes, setVotes] = useState([]);
  const [voteCount, setVoteCount] = useState(0)
  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)

  useEffect(() => {
    setVotes(skellie?.likes);
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
      dispatch(fetchUsers()),
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


  const countLikesDislikes = () => {
    let likes = 0
    let dislikes = 0
    votes?.forEach((vote) => {
      if (vote.type === 'like') {
        likes++
      } else {
        dislikes--
      }
    })

    let totalVotes = likes + dislikes;
    setVoteCount(totalVotes);
  }

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
    setUpVoteOrDownVote();
    countLikesDislikes();
  }, [votes])


  const handleUpVote = (e) => {
    e.preventDefault()
    if (currentUser) { 
      if (downVote) {
        dispatch(deleteLike(skeleton._id, currentUser._id))
        setDownVote(false)
        const like = {type: 'like', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id))
        setUpVote(true)
        setTimeout(() => {
          setVoteCount(count => count + 2);
        }, 100);
      } else {
        if (!upVote) {
          const like = {type: 'like', skeleton: skeleton._id, liker: currentUser._id }
          dispatch(createLike(like, skeleton._id))
          setUpVote(true)
          setTimeout(() => {
            setVoteCount(count => count + 1);
          }, 100);
        } else {
          dispatch(deleteLike(skeleton._id, currentUser._id))
          setUpVote(false)
          setTimeout(() => {
            setVoteCount(count => count - 1);
          }, 100);
        }
      }
    }
  }



  const handleDownVote = (e) => {
    e.preventDefault()
    if (currentUser) {
      if (upVote) {
        dispatch(deleteLike(skeleton._id, currentUser._id));
        setUpVote(false);
        const like = {type: 'dislike', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id));
        setDownVote(true);
        setTimeout(() => {
          setVoteCount(count => count - 2);
        }, 100);
      } else {
        if (downVote) {
          dispatch(deleteLike(skeleton._id, currentUser._id));
          setDownVote(false);
          setTimeout(() => {
            setVoteCount(count => count + 1);
          }, 100);
        } else {
          const like = {type: 'dislike', skeleton: skeleton._id, liker: currentUser._id }
          dispatch(createLike(like, skeleton._id));
          setDownVote(true);
          setTimeout(() => {
            setVoteCount(count => count - 1);
          }, 100);
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
    console.log(CurrentCollaboratorObj)
    
    SetCurrentCollaborator(skeletonId, CurrentCollaboratorObj)

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

    const buttonTypeDown = () => {
      if (currentUser._id !== "" && downVote) {
        return (
          <button onClick={handleDownVote} className="skeleton-show-downvote"><img src={Downvoted} className="vote-button-image skeleton-show-downvote" /></button>
        )
      } else if (currentUser._id !== "" && !downVote) {
        return (
          <button onClick={handleDownVote} className="skeleton-show-downvote"><img src={Downvote} className="vote-button-image skeleton-show-downvote" /></button>
        )
      } else if (currentUser._id === "") {
        return (
          <img src={Downvote} className="downVote-grey-color vote-button-image" />
        )
      }

    }


    const buttonTypeUp = () => {
      if (currentUser._id !== "" && upVote) {
        return (
          <button onClick={handleUpVote} className="skeleton-show-upvote"><img src={Upvoted} className="vote-button-image skeleton-show-upvote" /></button>
        )
      } else if (currentUser._id !== "" && !upVote) {
        return (
          <button onClick={handleUpVote} className="skeleton-show-upvote"><img src={Upvote} className="vote-button-image skeleton-show-upvote" /></button>
        )
      } else if (currentUser._id === "") {
        return (
          <img src={Upvote} className="upVote-grey-color vote-button-image" />
        )
      }

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
                        {/* <button onClick={handleDownVote} className="skeleton-show-downvote">{currentUser ? <img src={Downvote} className="vote-button-image skeleton-show-downvote" /> : <img src={Downvote} className="downVote-grey-color vote-button-image" /> }</button> */}
                        {/* {currentUser._id !== "" ? <button onClick={handleDownVote} className="skeleton-show-downvote"><img src={Downvote} className="vote-button-image skeleton-show-downvote" /></button> : <img src={Downvote} className="downVote-grey-color vote-button-image" /> } */}
                        {buttonTypeDown()}
                          <h1 id="skeleton-show-votes">{voteCount}</h1>
                        {buttonTypeUp()}
                       {/* {currentUser._id !== "" ?  <button onClick={handleUpVote} className="skeleton-show-upvote"><img src={Upvote} className="vote-button-image skeleton-show-upvote" /></button> : <img src={Upvote} className="upVote-grey-color vote-button-image" />} */}
                        {/* <button onClick={handleUpVote} className="skeleton-show-upvote">{ currentUser ? <img src={Upvote} className="vote-button-image skeleton-show-upvote" /> : <img src={Upvote} className="upVote-grey-color vote-button-image" /> } </button> */}
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
          { currentUser._id !== "" ? <div className='create-comment-container' id="comment-form-container">
            <textarea name="comment" id="comment-input" className="create-comment-form" rows="5" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}/> 
            <button type="submit" id="submit-comment-button" className="create-comment-sumbit" onClick={handlePost}>Submit</button> 
          </div> : <></> }
        </div>

        
          <CommentPanel skeleton={skellie} />
    
      </>
    )
  }
}


export default SkeletonShow;


