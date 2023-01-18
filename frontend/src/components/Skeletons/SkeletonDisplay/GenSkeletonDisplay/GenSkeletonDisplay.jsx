import GenSkeletonTile from '../../SkeletonTile/GenSkeletonTile/GenSkeletonTile'
import "./GenSkeletonDisplay.css"
const GenSkeletonDisplay = ({ skelliesProps }) => {
  const skellies = [1, 2, 3, 4, 5]
  // NOTE: 01-17-2023 - could we just import an array of skeletons as a prop?
  // like user.followedSkeletons for followed skeletons and Skeleton.All for
  // all skeletons? 
  // const skellies = user.followedSkeletons 
  return (
    <ul className='skeleton-grid'>
      {skellies.map((skellie) => <GenSkeletonTile component={skellie} key={skellie.id} />)}
    </ul>
  )
}

export default GenSkeletonDisplay;