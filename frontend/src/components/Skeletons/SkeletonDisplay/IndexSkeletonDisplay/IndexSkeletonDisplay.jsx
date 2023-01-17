import IndexSkeletonTile from '../../SkeletonTile/IndexSkeletonTile/IndexSkeletonTile'
import "./IndexSkeletonDisplay.css"
const IndexSkeletonDisplay = ({ skelliesProps }) => {
  const skellies = [1, 2, 3, 4, 5]
  // NOTE: 01-17-2023 - could we just import an array of skeletons as a prop?
  // like user.followedSkeletons for followed skeletons and Skeleton.All for
  // all skeletons? 
  // const skellies = user.followedSkeletons 
  return (
    <ul className='index-skeleton-grid'>
      {skellies.map((skellie) => <IndexSkeletonTile component={skellie} />)}
    </ul>
  )
}

export default IndexSkeletonDisplay;