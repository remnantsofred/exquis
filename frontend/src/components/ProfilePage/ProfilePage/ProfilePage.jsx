import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getUser, fetchUser } from '../../../store/users'

import './ProfilePage.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const { userId } = useParams()
  const user = useSelector(getUser(userId))

  useEffect(() => {
    Promise.all([
      dispatch(fetchUser(userId))
    ]).then(()=>{
      setLoaded(true);
    })
  }, [dispatch, userId])

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