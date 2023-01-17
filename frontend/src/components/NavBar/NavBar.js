// functions
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// assets
import ExquisLogo from '../../assets/main-nav-bar/exquisLogo.png'
import ExquisIcon from '../../assets/main-nav-bar/exquisIcon.png'
import SearchIcon from "../../assets/main-nav-bar/search-line-icon.svg"

// misc/css
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();


  const SearchButton = () => {
  return (
      <button id="search-bar-button">
        <img id="search-icon" src={SearchIcon} />
      </button>
  )}
    
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/skeletons'} id="skeleton-index-link">All Skeletons</Link>
          <Link to={'/profile'} id="profile-link">Profile</Link>
          <Link to={'/skeletons/new'} id="skeleton-form-link">New Skeleton</Link>
          <button onClick={logoutUser} id="logout-button">Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'} id="signup-link">signup</Link>
          <Link to={'/login'} id="login-link">login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <div className='nav-bar-container'>
        <div className='left'>
          <NavLink to="/">
            <div class="nav-logo">
            <img src={ExquisIcon} id="nav-icon" />
            <img src={ExquisLogo} id="nav-logo" />     
            </div>
          </NavLink>
        </div>
        <div className='center'>
            <div class="search-bar-container">
            <input type="text" className="search-bar" id="search-bar-input" placeholder="Search a new story here..." />
            <SearchButton className="search-bar" id="search-bar-button" />
          </div>
        </div>
        <div className='right'>
          { getLinks() }          
        </div>
      </div>
    </>
  );
}

export default NavBar;