import SkeletonTile from '../Skeletons/SkeletonTile'

const SkeletonDisplay = ({ user }) => {
  const skellies = [1, 2, 3, 4, 5]

  // const skellies = user.followedSkeletons 
  return (
    <ul>
      {skellies.map((skellie) => <SkeletonTile component={skellie} />)}
    </ul>
  )
}

export default SkeletonDisplay