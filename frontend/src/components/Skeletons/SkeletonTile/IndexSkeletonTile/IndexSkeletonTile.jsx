import './IndexSkeletonTile.css'
import { Link } from "react-router-dom"
// vote buttons
import UpvoteButton from '../UpvoteButton'
import DownvoteButton from '../DownvoteButton'
import IndexPlaceBones from './IndexPlaceBones'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { createLike, deleteLike } from '../../../../store/likes'

const IndexSkeletonTile = ({skeletonInfo}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)

  const votes = skeletonInfo?.likes 
  let skeleton = skeletonInfo


  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)
  // const [voteCount, setVoteCount] = useState(votes.length)

  const countLikesDislikes = () => {
    let likes = 0
    let dislikes = 0
    votes.forEach((vote) => {
      if (vote.type === 'like') {
        likes++
      } else {
        dislikes--
      }
    }
    )
    return likes + dislikes
  }


  const setUpVoteOrDownVote = () => {
    if (votes.length > 0) {
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
    countLikesDislikes()
  }, []) 

  
  const handleUpVote = (e) => {
    e.preventDefault()
    if (currentUser) { 
      if (downVote) {
        dispatch(deleteLike(skeleton._id, currentUser._id))
        setDownVote(false)
        const like = {type: 'like', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id))
        setUpVote(true)
      } else {
        if (!upVote) {
          const like = {type: 'like', skeleton: skeleton._id, liker: currentUser._id }
          dispatch(createLike(like, skeleton._id))
          setUpVote(true)
        } else {
          dispatch(deleteLike(skeleton._id, currentUser._id))
          setUpVote(false)
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
        const like = {type: 'dislike', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id))
        setDownVote(true)
      } else {
        if (downVote) {
          dispatch(deleteLike(skeleton._id, currentUser._id))
          setDownVote(false)
        } else {
          const like = {type: 'dislike', skeleton: skeleton._id, liker: currentUser._id }
          dispatch(createLike(like, skeleton._id))
          setDownVote(true)
        }
      }  
    }
  }


  const skeletonId = skeletonInfo._id
  const ownerId = skeletonInfo.owner._id

  const collaborators = ["natty", "daphne", "andrea"]
  const skeletonBody = "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information Pepsi-Cola."
  const likes = 20
  const tags = ["happy",  "nature", "scary",  "romance", "thriller", "mystery", "fantasy", "sci-fi"]

  return (
    <li className='skeleton-tile-object'>
      <div className="index-tile-container">
        <div className="index-title-container">
          <Link to={`/skeletons/${skeletonId}`} id="index-title-link">
            <h1 className="index-title">{skeletonInfo && skeletonInfo.title.toUpperCase()}</h1>
          </Link>
        </div>
          <div className="index-author-bones-container">
            <Link to={`/users/${ownerId}`} id="index-profile-link">
              <h1 className="index-author">{skeletonInfo && skeletonInfo.owner.username.toUpperCase()}</h1>
            </Link>
            <h1 className="index-author-bone-divider">//</h1>
            <h1 className="index-bone-counter">Bones: {skeletonInfo.bones.length} / {skeletonInfo.maxBones}</h1>
          </div>
          <div className='index-skeleton-body-likes-container'>
            <div className="index-skeleton-body-container">
              <IndexPlaceBones className="index-skeleton-body" bones={skeletonInfo.bones} />
            </div>
            <div className="index-skeleton-likes-container">
              <button onClick={handleUpVote} className="vote-button" id="upvote-button"><UpvoteButton className="vote-button" id="upvote-button" /></button>
                <p className="index-skeleton-like-count">{countLikesDislikes()}</p>
              <button onClick={handleDownVote} className="vote-button" id="downvote-button"><DownvoteButton id="downvote-button" /></button>
            </div>
          </div>
          {/* <div className="index-skeleton-tags-container"> */}
            <ul className='index-skeleton-tags'>
              {tags.map((tag) => <p className="index-ind-tag" key={tag} > #{`${tag}`} </p>)}
            </ul>
          {/* </div> */}
      </div>
    </li>
  )
}

export default IndexSkeletonTile;