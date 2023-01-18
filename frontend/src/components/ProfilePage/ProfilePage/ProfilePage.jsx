import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

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
  }, [dispatch, userId])

  console.log(userId)
  // const OwnedSkeletons = () => {
  //   const filteredSkeletons =  skeletons.filter(skeleton => skeleton.ownerId === userId);
  //   return (filteredSkeletons);
  // }

  return(
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
            <h1>
              USERNAME!!!
            </h1>
          </div>

        </div>
      </div>
      <div className='skeletons-block'>
        <ul className='skeletons-block-list'>

        </ul>
      </div>


    </div>
  )
}

export default ProfilePage;