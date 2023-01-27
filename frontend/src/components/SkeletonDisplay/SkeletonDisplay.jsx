import SkeletonTile from '../Skeletons/SkeletonTile'

const SkeletonDisplay = ({ user }) => {
  const skellies = [1, 2, 3, 4, 5]

  // const skellies = user.followedSkeletons 
  return (
    <ul className='skeleton-grid'>
      {skellies.map((skellie) => <SkeletonTile component={skellie} key={`skellie-tile-${skellie._id}`}/>)}
    </ul>
  )
}

export default SkeletonDisplay;