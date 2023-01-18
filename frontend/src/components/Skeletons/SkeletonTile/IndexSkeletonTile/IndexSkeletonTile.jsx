import './IndexSkeletonTile.css'

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

  const title = "Lorem Ipsum Kitty I love Cats"
  const author = "Skellie Crew"
  const collaborators = ["natty", "daphne", "andrea"]
  const maxBones = 20
  const currentBones = 4 // length of bones attribute
  const skeletonBody = "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information Pepsi-Cola."
  const likes = 20
  const tags = ["lorem",  "ipsum", "dolor",  "sit", "amet", "consectetur", "adipiscing", "elit"]
  // console.log(tags)
  
  return (
    <li className='skeleton-tile-object'>
      <div className="index-tile-container">
        <div className="index-title-container">
          <h1 className="index-title">{skeletonInfo.title.toUpperCase()}</h1>
        </div>
          <div className="index-author-bones-container">
            <h1 className="index-author">{author.toUpperCase()}</h1>
            <h1 className="index-author-bone-divider">//</h1>
            <h1 className="index-bone-counter">Bones: {currentBones} / {maxBones}</h1>
          </div>
          <div className='index-skeleton-body-likes-container'>
            <div className="index-skeleton-body-container">
              <p className="index-skeleton-body">{skeletonBody}</p>
            </div>
            <div className="index-skeleton-likes-container">
              <UpvoteButton />
                <p className="index-skeleton-like-count">{likes}</p>
              <DownvoteButton />
            </div>
          </div>
          <div className="index-skeleton-tags-container">
            <ul className='index-skeleton-tags'>
              {tags.map((tag) => <p className="index-ind-tag"> #{`${tag}`} </p>)}
            </ul>
          </div>
      </div>
    </li>
  )
}

export default IndexSkeletonTile;