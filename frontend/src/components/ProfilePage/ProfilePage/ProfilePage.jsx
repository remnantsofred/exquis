import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import { getUser, fetchUser } from '../../../store/users'
import SkeletonTab from './SkeletonTab/SkeletonTab'
import Banner from '../../../assets/profile_page/exquis_banner.png'
import ProfileIcon from '../../../assets/profile_page/exquis_profile_icon.png'
import './ProfilePage.css'
import { fetchSkeletons, getSkeletons } from '../../../store/skeletons'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const { userId } = useParams()
  const [tabVal, setTabVal] = useState("current")
  const [skellies, setSkellies] = useState({})


  const user = useSelector(getUser(userId))
  const skeletons = useSelector(getSkeletons())
  // console.log('store skeletons', (store) => store.skeletons)
  
  useEffect(() => {
    Promise.all([
      dispatch(fetchUser(userId)),
      dispatch(fetchSkeletons())
      
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])



  
  const whichSkellies = (switchValue) => {
   switch(switchValue) {
    case "current":
      return (
        skellies
      )
    case "owned":
      return (
        skellies
      )
    case "previous":
      return (
        skellies
      )
    default:
      return (
        "death, destruction"
      )
  }}


  const handleClick = (e) => {
    setTabVal(e.target.id)
    whichSkellies(e.target.id)
  }


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
        <div className='profile-skeleton-tab-bar'>
          <div>
            <h3 className='profile-skeleton-tab'
                onClick={(e) => handleClick(e)}
                id="current"
              >
              Current Skeletons
            </h3>
          </div>
          <div>
            <h3 className='profile-skeleton-tab'
              onClick={(e) => handleClick(e)}
              id="owned"
              >
              Owned Skeletons
            </h3>
          </div>
          <div>
            <h3 className='profile-skeleton-tab'
              onClick={(e) => handleClick(e)}
              id="previous"
              >
              Previous Skeletons
            </h3>
          </div>
        </div>
      </div>
      <div>
        <SkeletonTab switchValue={tabVal} skellies={skeletons} userId={userId}/>
      </div>

    </div>
  )}
}

export default ProfilePage;