import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './ProfilePage.css'

const ProfilePage = () => {
  const { userId } = useParams
  const user = useSelector(state => Object.values(state.users[userId]))
  const dispatch = useDispatch()
  const skeletons = useSelector(state => Object.values(state.skeletons.all))


  // useEffect(() => {
  //   dispatch(skeletonActions.getSkeletons())
  // }, [dispatch])

  // const OwnedSkeletons = () => {
  //   const filteredSkeletons =  skeletons.filter(skeleton => skeleton.ownerId === userId);
  //   return (filteredSkeletons);
  // }

  return(
    <div>
      <h1>this is the profile page!</h1>
    </div>
  )
}

export default ProfilePage;