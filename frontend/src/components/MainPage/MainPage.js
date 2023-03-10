import './MainPage.css'
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getSkeletons, fetchSkeletons } from '../../store/skeletons';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading'
import GenSkeletonDisplay from '../Skeletons/SkeletonDisplay/GenSkeletonDisplay/GenSkeletonDisplay';
import TrendingBar from './TrendingBar/TrendingBar';

function MainPage () {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const skeletons = useSelector(getSkeletons);
  const [loaded, setLoaded] = useState(false);
  let history = useHistory();

  useEffect(() => {
    Promise.all([
      dispatch(fetchSkeletons())
    ]).then(()=>{
      setLoaded(true);
    })
  },[]);

  // useEffect(() => {
  //   if (loaded) {
  //     setLoaded(false);
  //     const paramsMap = getParams(history.location.search)
  //     dispatch(fetchSkeletons()).then(()=>setLoaded(true))
  //   }
  // }, [history.location.search]);


  const getParams = (params) => {
    const paramsString = params.slice(1)
    const paramsArray = paramsString.split('&')
    const paramsMap = {};
    for (const param of paramsArray){
      const [key, value] = param.split('=')
      paramsMap[key] = value
    }
    return paramsMap;
  }




  const greetingPhrases = [
    "What's cookin' good lookin'?",
    "In case I don't see ya, good afternoon, good evening, and good night!",
    "Greetings. All.",
    "Speech! Speech! Speech!",
    "Crack an egg on your head. Let the yolk drip down.",
    "Quiet, sky rodent! To the shovels!",
    "Fool me once, fool me twice, fool me chicken soup with rice.",
    "Bears. Beets. Battlestar Galactica.",
    "Just remember, every time you look up at, the moon, I, too, will be looking at a moon.",
    "Sometimes you gotta work a little so you can ball a lot.",
    "There has never been a sadness that can't been cured by breakfast food.",
    "Jogging is the worst. I know it keeps you healthy, but God, at what cost?",
    "When life gives you lemons, make lemonade. I read that one on a can of lemonade. I like to think it applies to life.",
    "I typed your symptoms into the thing up here, and it says you could have... network connectivity problems?"
  ]

  const randomGreetingFxn = (array) => {
    return (
      array[Math.floor((Math.random() * (array.length)))]
    )
  };  

  const randomGreeting = () => {
    return (
      randomGreetingFxn(greetingPhrases)
    )
  };

  if (!loaded) {
  return (
    <Loading />
  )} else {
  return (
    <>
      <div className='main-page'>
        <div className="goofy-greeting-container">
          <h1 id="goofy-greeting">{randomGreeting()}</h1>
        </div>
        {/* <hr id="main-page-hr"/> */}

        <div className="main-content">

          <GenSkeletonDisplay skeletons={skeletons} setLoaded={setLoaded}/>

          <div>
            <TrendingBar skeletons={skeletons} />
          </div>
        </div>
        
      </div>
    </>
  )};
}
export default MainPage;