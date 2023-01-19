import './IndexSkeletonTile.css'
import { Link } from "react-router-dom"
// vote buttons
import UpvoteButton from '../UpvoteButton'
import DownvoteButton from '../DownvoteButton'

const IndexSkeletonTile = ({skeletonInfo}) => {
  // console.log(skeletonInfo)
  // console.log(Object.values(skeletonInfo))
  // const title = skeletonInfo.title
  // const author = skeletonInfo.author
  // const collaborators = skeletonInfo.collaborators
  // const maxBones = skeletonInfo.maxBones
  // const currentBones = skeletonInfo.currentBones // length of bones attribute
  // const skeletonBody = skeletonInfo.skeletonBody
  // const likes = skeletonInfo.likes
  // const tags = skeletonInfo.tags

  const skeletonId = skeletonInfo._id
  const ownerId = skeletonInfo.owner._id

  const collaborators = ["natty", "daphne", "andrea"]
  const skeletonBody = "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information Pepsi-Cola."
  const likes = 20
  const tags = ["happy",  "nature", "scary",  "romance", "thriller", "mystery", "fantasy", "sci-fi"]
  // console.log(tags)
  // TODO: fetch skeleton bones from backend?

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
              <p className="index-skeleton-body">{skeletonBody}</p>
              
            </div>
            <div className="index-skeleton-likes-container">
              <UpvoteButton />
                <p className="index-skeleton-like-count">{skeletonInfo.likes.length}</p>
              <DownvoteButton />
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