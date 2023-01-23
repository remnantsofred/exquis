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
import { deleteLike, createLike } from '../../../../store/likes'

const IndexSkeletonTile = ({skeletonInfo}) => {
  // const title = skeletonInfo.title
  // const author = skeletonInfo.author
  // const collaborators = skeletonInfo.collaborators
  // const maxBones = skeletonInfo.maxBones
  // const currentBones = skeletonInfo.currentBones // length of bones attribute
  // const skeletonBody = skeletonInfo.skeletonBody
  // const likes = skeletonInfo.likes
  // const tags = skeletonInfo.tags

  // console.log("skeletonInfo: ", skeletonInfo)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)

  const votes = skeletonInfo.likes 
  let skeleton = skeletonInfo



  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)
  const [upVoteCount, setVoteCount] = useState(votes.length)


  const handleUpVote = (e) => {
    console.log("upvote clicked")
    e.preventDefault()
    if (currentUser) {
      if (!upVote) {
        const like = {likeType: 'like', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id))
        setUpVote(true)
        setVoteCount(upVoteCount => upVoteCount + 1)
      } else {
        const liketoDelete = votes.find(like => like.liker === currentUser._id)

        dispatch(deleteLike(liketoDelete))
        setUpVote(false)
        setVoteCount (upVoteCount => upVoteCount - 1)
      }
    }
  }

  console.log("skeleton: ", skeleton)

  const handleDownVote = (e) => {
    e.preventDefault()
    if (currentUser) {
      if (downVote) {
        const liketoDelete = votes.find(like => like.id=== currentUser._id)
        console.log("liketoDelete: ", liketoDelete)
        dispatch(deleteLike(liketoDelete))
        setDownVote(false)
        setVoteCount (upVoteCount => upVoteCount - 1)
      } else {
        const like = {likeType: 'disLike', skeleton: skeleton._id, liker: currentUser._id }
        dispatch(createLike(like, skeleton._id))
        setDownVote(true)
        setVoteCount(upVoteCount => upVoteCount + 1)
      }
    }
  }


  // useEffect (() => {
  //   if (currentUser) {
  //     let like;
  //     if (skeleton.likes) {
  //       like = skeleton.likes[currentUser.id]
  //     }
  //     if (like) {
  //       if (like.likeType === 'like') {
  //         setLiked(true)
  //       } else if (like.likeType === 'dislike') {
  //         setDisliked(true)
  //       } else {
  //         setLiked(false)
  //         setDisliked(false)
  //       }
  //     }
  //   }
  // }, [currentUser, skeleton])



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
              <button onClick={handleUpVote}><UpvoteButton /></button>
                <p className="index-skeleton-like-count">{votes.length}</p>
              <button onClick={handleDownVote}><DownvoteButton /></button>
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