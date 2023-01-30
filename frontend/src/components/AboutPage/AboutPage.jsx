import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

import AniFrame1 from '../../assets/profile_page/exquis_smol_ani_1.png'
import AniFrame2 from '../../assets/profile_page/exquis_smol_ani_2.png'
import ExquisLogo from '../../assets/main-nav-bar/exquisLogo.png'
import DangerImage from '../../assets/profile_page/danger_anger.jfif'

import { getUser, fetchUser } from '../../store/users'

import Banner from '../../assets/profile_page/exquis_banner.png'
import './AboutPage.css'

const AboutPage = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDisobey, setIsDisobey] = useState(false)
  // const { userId } = useParams()
  // const [tabVal, setTabVal] = useState("current")
  // const [skellies, setSkellies] = useState({})
  // const user = useSelector(getUser(userId))

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);


  useEffect(() => {
    Promise.all([
      
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])

  const DangerClick = () => {
    setIsDisobey(true)
  }

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
      <div className='about-container'>
          <div className='profile-top'>
            <img id="skull-buddy-ani-about"
              src={AniFrame1}
            />
            <br />
            <img id="about-logo" src={ExquisLogo} />
            <h1 className='about-sub-greeting'>what is exquis? (/ɛksˈkis/)</h1> 
            <hr className='current-user-hr'/>
            <div id="about-grid-container" grid-template-columns="2">
              <div id="about-1">
              <blockquote cite="https://en.wikipedia.org/wiki/Exquisite_corpse" id="wiki-quote">
                "Exquisite corpse (from the original French term cadavre exquis, literally exquisite cadaver), 
                is a method by which a collection of words or images is collectively assembled. Each collaborator 
                adds to a composition in sequence, either by following a rule... or by being allowed to see only the 
                end of what the previous person contributed.
                <br />
                </blockquote>
              </div>
              <div id="about-vr-container">
                <hr id="about-vr" />
              </div>
              <div id="about-2">
                <blockquote cite="https://en.wikipedia.org/wiki/Exquisite_corpse" id="wiki-quote">
                  The name is derived from a phrase that resulted when Surrealists first played the game, "Le cadavre exquis boira le vin nouveau." ("The exquisite corpse shall drink the new wine.") " 
                  <br />
                </blockquote>
                 <br />
                <a href='https://en.wikipedia.org/wiki/Exquisite_corpse' id="wiki-link"> ~ Exquisite corpse (Wikipedia) </a>
              </div>
            </div>

              <br />

            <p className='explanatory-text'>Exquis is a collaborative story-telling app, where users can create “skeletons” and add collaborators, 
              who take turns adding “bones” to the skeleton. Exquis is inspired by the surrealist technique known as 
              “exquisite corpse,” where participants take turns adding piece by piece to a dynamic, evolving collective 
              art piece. At Exquis we believe more minds = more fun. Watch your skeletons grow and unfold into unpredictable 
              and unique works of art. Build beautiful stories and experiences with friends, or build friendships by creating 
              art together.
            </p>
            <div id="about-hr-container">
              <hr id="about-hr" />
            </div>
          <div className="current-user-options-container">
            <ul className='current-user-options'>
              <li className='user-option' onClick={DangerClick}>Don't think of clicking me. Don't do it.</li>
            </ul>
          </div>
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

export default AboutPage;