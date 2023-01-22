import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'

import MainPage from './components/MainPage/MainPage.js';
import LoginForm from './components/SessionForms/LoginForm.jsx';
import SignupForm from './components/SessionForms/SignupForm.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage/ProfilePage'
import CurrentUserProfilePage from './components/CurrentUserProfilePage/ProfilePage/CurrentUserProfilePage';

import { getCurrentUser } from './store/session';

import "./App.css"

import SkeletonIndex from './components/Skeletons/SkeletonIndex/SkeletonIndex.jsx';
import SkeletonForm from './components/Skeletons/SkeletonForm/SkeletonForm.jsx';
import SkeletonShow from './components/Skeletons/SkeletonDisplay/SkeletonShow/SkeletonShow';
import NewDraftSkeletonShow from './components/Skeletons/SkeletonDisplay/SkeletonShow/REFACTOR-SKETCH-SkeletonShow';

import UpdateForm from './components/SessionForms/UpdateForm';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/skeletons/new" component={SkeletonForm} />
        <Route exact path="/skeletons/:skeletonId" component={NewDraftSkeletonShow} />
        <Route exact path="/skeletons" component={SkeletonIndex} />

        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/profile" component={CurrentUserProfilePage} />
        <ProtectedRoute exact path="/edit/profile" component={UpdateForm} />

        <Route exact path="/users/:userId" component={ProfilePage} />
      </Switch>
      <Footer />
    </>
  );
}


export default App;
