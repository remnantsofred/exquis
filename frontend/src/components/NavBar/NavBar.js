import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// assets
import ExquisLogo from '../../assets/main-nav-bar/exquisLogo.png'
import ExquisIcon from '../../assets/main-nav-bar/exquisIcon.png'
import SearchIcon from "../../assets/main-nav-bar/search-line-icon.svg"

// misc/css
import './NavBar.css';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const SearchButton = () => {
  return (
      <button id="search-bar-button">
        <img id="search-icon" src={SearchIcon} />
      </button>
  )}
    
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
      history.push(`/login`);
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/about'} id="about-us-link">about</Link>
          <Link to={'/skeletons'} id="skeleton-index-link">all skeletons</Link>
          <Link to={'/profile'} id="profile-link">profile</Link>
          <Link to={'/skeletons/new'} id="skeleton-form-link">new skeleton</Link>
          <a onClick={logoutUser} id="logout-button" style={{"cursor":"pointer"}} >logout</a>

        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/about'} id="about-us-link">about</Link>
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
            <div className="nav-logo-container">
              <img src={ExquisIcon} id="nav-icon" />
              <img src={ExquisLogo} id="nav-logo" />     
            </div>
          </NavLink>
        </div>
        <div className='center'>
            {/* <div className="search-bar-container">
            <input type="text" className="search-bar" id="search-bar-input" placeholder="Search a new story here..." />
            <SearchButton className="search-bar" id="search-bar-button" />
            </div> */}
        </div>
        <div className='right'>
          { getLinks() }          
        </div>
      </div>
    </>
  );
}

export default NavBar;