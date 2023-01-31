import './IndexSkeletonTile.css'
import { Link } from "react-router-dom"
import Downvote from '../../../../assets/skeleton_tile/triangle_button_down.png'
import Upvote from '../../../../assets/skeleton_tile/triangle_button_up.png'
import IndexPlaceBones from './IndexPlaceBones'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { createLike, deleteLike } from '../../../../store/likes'
import SessionUserCheck from '../../../SessionUserCheck/SessionUserCheck'


const IndexSkeletonTile = ({skeletonInfo}) => {
  const dispatch = useDispatch()
  const currentUser = SessionUserCheck();


  const votes = skeletonInfo?.likes 
  let skeleton = skeletonInfo

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

  const skeletonId = skeletonInfo._id
  const ownerId = skeletonInfo.owner._id

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
              <p className="index-skeleton-like-count">{countLikesDislikes()}</p>
              <p className="index-skeleton-like-caption">Votes</p>
            </div>
          </div>
      </div>
    </li>
  )
}

export default IndexSkeletonTile;