import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import ResetScroll from './components/ResetScroll';
import Footer from './components/Footer/Footer'

import MainPage from './components/MainPage/MainPage.js';
import LoginForm from './components/SessionForms/LoginForm.jsx';
import SignupForm from './components/SessionForms/SignupForm.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage/ProfilePage'
import CurrentUserProfilePage from './components/CurrentUserProfilePage/ProfilePage/CurrentUserProfilePage';
import AboutPage from './components/AboutPage/AboutPage';

import { getCurrentUser } from './store/session';

import "./App.css"

import SkeletonIndex from './components/Skeletons/SkeletonIndex/SkeletonIndex.jsx';
import SkeletonForm from './components/Skeletons/SkeletonForm/SkeletonForm.jsx';
import SkeletonShow from './components/Skeletons/SkeletonDisplay/SkeletonShow/SkeletonShow';
import RandoPrompt from './components/Skeletons/SkeletonForm/RandoPrompt';

import UpdateForm from './components/SessionForms/UpdateForm';
import Loading from './components/Loading/Loading';
import "./fonts/OpenSans-VariableFont_wdth,wght.ttf";
import "./fonts/Inter-VariableFont_slnt,wght.ttf";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <ResetScroll />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/skeletons/new" component={SkeletonForm} />
        <Route exact path="/skeletons/:skeletonId" component={SkeletonShow} />
        <Route exact path="/skeletons" component={SkeletonIndex} />

        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/profile" component={CurrentUserProfilePage} />
        <ProtectedRoute exact path="/edit/profile" component={UpdateForm} />
        <Route exact path="/about" component={AboutPage} />

        <Route exact path="/users/:userId" component={ProfilePage} />
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/random_prompt_test" component={RandoPrompt} />
      </Switch>
      <Footer />
    </>
  );
}


export default App;
