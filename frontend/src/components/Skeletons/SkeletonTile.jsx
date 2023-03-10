import './SkeletonTile.css'

// vote buttons
import UpvoteButton from './UpvoteButton'
import DownvoteButton from './DownvoteButton'

const SkeletonTile = ({skeletonInfo}) => {

  const title = "Lorem Ipsum Kitty I love Cats"
  const author = "Skellie Crew"
  const collaborators = ["natty", "daphne", "andrea"]
  const maxBones = 20
  const currentBones = 4 // length of bones attribute
  const skeletonBody = "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information Pepsi-Cola."
  const likes = 20
  const tags = ["lorem",  "ipsum", "dolor",  "sit", "amet", "consectetur", "adipiscing", "elit"]
  
  return (
    <li className='skeleton-tile-object'>
      <div className="skeleton-tile-container">
          <div className="tile-top-container">
            <div className="title-author-container">
              <div className="title-container">
                <h1 className="title">{skeletonInfo.title.toUpperCase()}</h1>
              </div>
              <h1 className='title-author-divider'>//</h1> 
              <div className="author-container">
                <h1 className="author">{skeletonInfo.author.toUpperCase()}</h1>
              </div>
            </div>
            <h3 className="bone-counter">Bones: {skeletonInfo.bones.length} / {skeletonInfo.maxBones}</h3>
          </div>
          <div className='skeleton-body-likes-container'>
            <div className="skeleton-body-container">
              <p className="skeleton-body">{skeletonInfo.skeletonBody}</p>
            </div>
            <div className="skeleton-likes-container">
                <p className="skeleton-like-count">{skeletonInfo.likes}</p>
            </div>
          </div>
          <div className="skeleton-tags-container">
            <ul className='skeleton-tags'>
              {skeletonInfo.tags.map((tag) => <p className="ind-tag" key={tag}> #{`${tag}`} </p>)}
            </ul>
          </div>
      </div>
    </li>
  )
}

export default SkeletonTile;