import IndexSkeletonTile from '../../SkeletonTile/IndexSkeletonTile/IndexSkeletonTile'
import "./IndexSkeletonDisplay.css"
import { useSelector } from 'react-redux';

const IndexSkeletonDisplay = ({ skelliesProps, skeletons, setLoaded}) => {

  // NOTE: 01-17-2023 - could we just import an array of skeletons as a prop?
  // like user.followedSkeletons for followed skeletons and Skeleton.All for
  // all skeletons? 
 
  if (skeletons) {
    return (
      <ul className='index-skeleton-grid'>
        {skeletons.map((skellie, idx) => {
          return <IndexSkeletonTile 
            component={skellie} 
            key={idx} 
            skeletonInfo={skellie}
            />})}
      </ul>
    )
  }
}

export default IndexSkeletonDisplay;