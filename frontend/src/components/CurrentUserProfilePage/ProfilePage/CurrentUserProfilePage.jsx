import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading/Loading'

import AniFrame1 from '../../../assets/profile_page/exquis_smol_ani_1.png'
import AniFrame2 from '../../../assets/profile_page/exquis_smol_ani_2.png'

import { getUser, fetchUser } from '../../../store/users'

import Banner from '../../../assets/profile_page/exquis_banner.png'
import './CurrentUserProfilePage.css'

const CurrentUserProfilePage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser._id
  const [loaded, setLoaded] = useState(false)
  // const { userId } = useParams()
  // const [tabVal, setTabVal] = useState("current")
  // const [skellies, setSkellies] = useState({})
  // const user = useSelector(getUser(userId))

  useEffect(() => {
    Promise.all([
      dispatch(fetchUser(userId))
      
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])

  console.log(userId, "userId from profile page")
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
      <div className='general-profile-left'>
        
      </div>
      <div className='profile-top'>
        <h1 className='current-user-greeting'>Hello <span id="current-user-username">{`${sessionUser.username}`}</span>,</h1>
        <h2 className='current-user-sub-greeting'>what would you like to do today?</h2> 
        <hr className='current-user-hr'/>
      </div>
      <div className="current-user-options-container">
        <ul className='current-user-options'>
          <li className='user-option'>Go to my Page</li>
          <li className='user-option'>Change Profile Settings</li>
          <li className='user-option'>Don't think of clicking me. Don't do it.</li>
        </ul>
      </div>
       <div className='general-profile-right'>
        
      </div>
    </div>
  )}
}

export default CurrentUserProfilePage;