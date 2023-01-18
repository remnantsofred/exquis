import IndexSkeletonTile from '../../SkeletonTile/IndexSkeletonTile/IndexSkeletonTile'
import "./IndexSkeletonDisplay.css"
const IndexSkeletonDisplay = ({ skelliesProps, skeletons, setLoaded}) => {
  const skellies = [1, 2, 3, 4, 5]
  // NOTE: 01-17-2023 - could we just import an array of skeletons as a prop?
  // like user.followedSkeletons for followed skeletons and Skeleton.All for
  // all skeletons? 
  // const skellies = user.followedSkeletons 
  if (skeletons) setLoaded(true)
  console.log(skeletons, "skeletons")
  if (skeletons) {
    return (
      <ul className='index-skeleton-grid'>
        {skeletons.map((skellie, idx) => 
          <IndexSkeletonTile 
            component={skellie} 
            key={idx} 
            skeletonInfo={skellie}/>)}
      </ul>
    )
  }
}

export default IndexSkeletonDisplay;