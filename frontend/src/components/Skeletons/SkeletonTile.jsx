const SkeletonTile = ({skeletonInfo}) => {
  // const title = skeletonInfo.title
  // const author = skeletonInfo.author
  // const collaborators = skeletonInfo.collaborators
  // const maxBones = skeletonInfo.maxBones
  // const currentBones = skeletonInfo.currentBones // length of bones attribute
  // const skeletonBody = skeletonInfo.skeletonBody
  // const likes = skeletonInfo.likes
  // const tags = skeletonInfo.tags

  const title = "Lorem Ipsum"
  const author = "Skellie Crew"
  const collaborators = ["natty", "daphne", "andrea"]
  const maxBones = 20
  const currentBones = 4 // length of bones attribute
  const skeletonBody = "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information Pepsi-Cola."
  const likes = 20
  const tags = ["lorem",  "ipsum", "dolor",  "sit", "amet", "consectetur", "adipiscing", "elit"]
  
  return (
    <li>
      <div className="skeleton-tile-container">
          <div>
            <h1 className="title-author">{title} // {author}</h1>
            <h3 className="bone-counter">{currentBones} / {maxBones}</h3>
          </div>
          <div className="skeleton-body-likes-container">
            <p className="skeleton-body">{skeletonBody}</p>
            <p className="skeleton-like-count">{likes}</p>
          </div>
          <div className="skeleton-tags">
            <ul>
              {tags.map((tag) => {<p className="ind-tag">#{`${tag}`}</p>})}
            </ul>
          </div>
      </div>
    </li>
  )
}

export default SkeletonTile;