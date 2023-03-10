import './GenSkeletonTile.css'
import { Link } from "react-router-dom"
// vote buttons
import UpvoteButton from '../UpvoteButton'
import DownvoteButton from '../DownvoteButton'
import GenPlaceBones from './GenPlaceBones'

const GenSkeletonTile = ({skeletonInfo}) => {

  const skeletonId = skeletonInfo._id
  const ownerId = skeletonInfo.owner._id
  const votes = skeletonInfo?.likes

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

  // "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information Pepsi-Cola."
  const tags = ["lorem",  "ipsum", "dolor",  "sit", "amet", "consectetur", "adipiscing", "elit"]
  // const tags = skeletonInfo.tags
  return (
    <li className='skeleton-tile-object'>
      <Link to={`/skeletons/${skeletonId}`} id="gen-skeleton-link">
      <div className="skeleton-tile-container">
          <div className="tile-top-container">
            <div className="title-author-container">
              <div className="title-container">
                <Link to={`/skeletons/${skeletonId}`} id="gen-title-link">
                  <h1 className="title">{skeletonInfo && skeletonInfo.title.toUpperCase()}</h1>
                </Link>
              </div>
              <h1 className='title-author-divider'>//</h1> 
              <div className="author-container">
                <Link to={`/users/${ownerId}`} id="gen-profile-link">
                  <h1 className="author">{skeletonInfo && skeletonInfo.owner.username.toUpperCase()}</h1>
                </Link>
              </div>
            </div>
            <h3 className="bone-counter">Bones: {skeletonInfo.bones.length} / {skeletonInfo.maxBones}</h3>
          </div>
          <div className='skeleton-body-likes-container'>
            <div className="skeleton-body-container">
              <GenPlaceBones className="skeleton-body" bones={skeletonInfo.bones} />
            </div>
            <div className="skeleton-likes-container">
              <p className="skeleton-like-count">{countLikesDislikes()}</p>
              <p className="skeleton-like-caption">Votes</p>
            </div>
          </div>
      </div>
      </Link>
    </li>
  )
}

export default GenSkeletonTile;