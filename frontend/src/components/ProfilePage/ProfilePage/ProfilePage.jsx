import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading/Loading'

import { getUser, fetchUser } from '../../../store/users'

import Banner from '../../../assets/profile_page/exquis_banner.png'
import ProfileIcon from '../../../assets/profile_page/exquis_profile_icon.png'
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
    )} else {
  return (
    <div className='general-profile-container'>
      <div className='profile-top'>
        <div className='profile-banner'>
            <img src={Banner} className="profile-banner" id="banner-image" />
        </div>

        <div className='profile-top-middle'>
          <div className='profile-icon-border'>
            <div className='profile-icon'>
                <img src={ProfileIcon} className='profile-icon' id="profile-icon-image" />
            </div>
          </div>


          <div className='username-block'>
            <h1 id="username">
              {user.username}
            </h1>
            <hr id="username-line-divider" />
          </div>

        </div>
      </div>
      <div className='profile-bottom'>
        <div className='profile-top-bottom'>
          <div className='skeletons-block' id="current-skeletons-block">
            <h2 className='profile-bottom-title'>Current Skeletons</h2>
            <ul className='skeletons-block-list' id="current-skeletons-block-list">

            </ul>
          </div>
          <div className='skeletons-block' id="owned-skeletons-block">
            <h2 className='profile-bottom-title'>Owned Skeletons</h2>
            <ul className='skeletons-block-list' id="owned-skeletons-block-list">

            </ul>
          </div>
        </div>
        <div className='bottom-skeletons-block' id="previous-skeletons-block">
          <h2 className='profile-bottom-title'>Previous Skeletons</h2>
          <ul className='skeletons-block-list' id="previous-skeletons-block-list">

          </ul>
        </div>
      </div>



    </div>
  )}
}

export default ProfilePage;