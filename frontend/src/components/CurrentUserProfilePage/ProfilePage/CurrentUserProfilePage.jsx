import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Loading from '../../Loading/Loading'

import AniFrame1 from '../../../assets/profile_page/exquis_smol_ani_1.png'
import AniFrame2 from '../../../assets/profile_page/exquis_smol_ani_2.png'
import DangerImage from '../../../assets/profile_page/danger_anger.jfif'

import { getUser, fetchUser } from '../../../store/users'

import Banner from '../../../assets/profile_page/exquis_banner.png'
import './CurrentUserProfilePage.css'

const CurrentUserProfilePage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser._id
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDisobey, setIsDisobey] = useState(false)
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

  const DangerClick = () => {
    console.log('is it working?')
    setIsDisobey(true)
    console.log(isDisobey)
  }

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
    <>
      <div className='general-current-user-profile-container'>
        <div className='general-profile-left'>
          <div className='profile-top'>
            <h1 className='current-user-greeting'>Hello <span id="current-user-username">{`${sessionUser.username}`}</span>,</h1>
            <h2 className='current-user-sub-greeting'>what would you like to do today?</h2> 
            <hr className='current-user-hr'/>
          </div>
          <div className="current-user-options-container">
            <ul className='current-user-options'>
              <Link to={`/users/${sessionUser._id}`} id="current-user-profile-link">
                <li className='user-option'>Go to my Page</li>
              </Link>
              <Link to={`/edit/profile`} id="edit-current-user-profile-link">
                <li className='user-option'>Update Profile Settings</li>
              </Link>
              <li className='user-option' onClick={DangerClick}>Don't think of clicking me. Don't do it.</li>
            </ul>
          </div>
        </div>

        <div className='general-profile-right'>
          <img className='general-profile-right'
            id="skull-buddy-ani"
            src={AniFrame1}
          />
        </div>
      </div>
      <img src={DangerImage} class={isDisobey ? "cat-activate" : "danger-image"} />
      <h1 class={isDisobey ? "danger-text" : "silent-text"} id="danger-text-1">YOU JUST HAD TO - I WARNED YOU. I WARNED YOU BUT YOU SAID 'OOOH NO, NO NO I GOTTA PRESS IT NO'</h1>
      <h1 class={isDisobey ? "danger-text" : "silent-text"} id="danger-text-2">LOOK WHAT YOU DID. NOW YOU HAVE TO REFRESH THE PAGE. ARE YOU HAPPY NOW???? ARE YOU???? ARE YOU HAPPY? ARE YOU??</h1>
      <h1 class={isDisobey ? "danger-text" : "silent-text"} id="danger-text-3">YOU HAVEN'T REFRESHED YET?? WHAT ARE YOU WAITING FOR?? DEAR LORD</h1>

      <div id="current-user-whitespace">
        <br className='whitespace' />
        <br className='whitespace' />
        <br className='whitespace' />
        <br className='whitespace' />
        <br className='whitespace' />
        <br className='whitespace' />
        <br className='whitespace' />
        {/* <br className='whitespace' /> */}

      </div>
    </>
  )}
}

export default CurrentUserProfilePage;