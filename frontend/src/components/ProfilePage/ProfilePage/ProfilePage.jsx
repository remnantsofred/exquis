import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading/Loading'

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
  }, [])

  // useEffect(() => {
  //   Promise.all([
  //     dispatch(fetchUser(userId))
      
  //   ]).then(()=>{
  //     // setLoaded(true);
  //   })
  // }, [dispatch, userId])

  console.log(userId, "userId from profile page")
  console.log(user, "user from profile page")
  // const OwnedSkeletons = () => {
  //   const filteredSkeletons =  skeletons.filter(skeleton => skeleton.ownerId === userId);
  //   return (filteredSkeletons);
  // }
  // if (user !== null) setLoaded(true)

  if (!loaded) {
    return (
      <div>
        <Loading />
      </div>
    )
  } else {
    return(
      <div>
        <h1>this is the profile page!</h1>
        <h2>Username: {user.username}</h2>
      </div>
    )
  }
}

export default ProfilePage;