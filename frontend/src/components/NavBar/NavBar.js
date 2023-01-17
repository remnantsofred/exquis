// functions
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// assets
import ExquisLogo from '../../assets/main-nav-bar/exquisLogo.png'
import ExquisIcon from '../../assets/main-nav-bar/exquisIcon.png'

// misc/css
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/skeletons'}>All Skeletons</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/skeletons/new'}>Start a Skeleton</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <div class="nav-logo">
      <img src={ExquisIcon} id="nav-icon" />
      <img src={ExquisLogo} id="nav-logo" />     
      </div>
 
      { getLinks() }
    </>
  );
}

export default NavBar;