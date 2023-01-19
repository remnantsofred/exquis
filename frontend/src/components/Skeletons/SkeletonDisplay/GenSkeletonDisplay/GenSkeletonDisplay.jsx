import GenSkeletonTile from '../../SkeletonTile/GenSkeletonTile/GenSkeletonTile'
import "./GenSkeletonDisplay.css"
const GenSkeletonDisplay = ({ skeletons, setLoaded }) => {
  // NOTE: 01-17-2023 - could we just import an array of skeletons as a prop?
  // like user.followedSkeletons for followed skeletons and Skeleton.All for
  // all skeletons? 
  // const skellies = user.followedSkeletons 

  // if (skeletons) setLoaded(true)

  return (
    <ul className='skeleton-grid'>
      {skeletons.map((skellie, idx) => 
        <GenSkeletonTile 
          component={skellie} 
          key={idx} 
          skeletonInfo={skellie} 
      />)}
    </ul>
  )
}

export default GenSkeletonDisplay;