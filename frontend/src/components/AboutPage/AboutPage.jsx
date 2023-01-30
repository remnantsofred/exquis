import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

import AniFrame1 from '../../assets/profile_page/exquis_smol_ani_1.png'
import AniFrame2 from '../../assets/profile_page/exquis_smol_ani_2.png'
import ExquisLogo from '../../assets/main-nav-bar/exquisLogo.png'
import SocialLinkDiv from './SocialLinkDiv'
import DeveloperPicture from './DeveloperPicture'
import DangerImage2 from '../../assets/profile_page/angerdog.jfif'

import DaphnePic from '../../assets/social-media-icons/daphneGithub.jfif'
import AndreaPic from '../../assets/social-media-icons/andreaGithub.jfif'
import NathanPic from '../../assets/social-media-icons/nathanGithub.png'

import { getUser, fetchUser } from '../../store/users'

import Banner from '../../assets/profile_page/exquis_banner.png'
import './AboutPage.css'

const AboutPage = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDisobey, setIsDisobey] = useState(false)
  
  const daphneGithub = "https://github.com/remnantsofred"
  const daphneLinkedin = " https://www.linkedin.com/in/lamdaphne/"
  const daphneSocials = SocialLinkDiv(daphneGithub, daphneLinkedin)
  const daphneProfile = DeveloperPicture(DaphnePic)

  const andreaGithub = "https://github.com/andreacanog"
  const andreaLinkedin = "https://www.linkedin.com/in/andrea-cano-gisbert-4402151b8/"
  const andreaSocials = SocialLinkDiv(andreaGithub, andreaLinkedin)
  const andreaProfile = DeveloperPicture(AndreaPic)

  const nathanGithub = "https://github.com/haeuncreative"
  const nathanLinkedin = "https://www.linkedin.com/in/nathankwon818/"
  const nathanSocials = SocialLinkDiv(nathanGithub, nathanLinkedin)
  const nathanProfile = DeveloperPicture(NathanPic)

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
            <h1 className='about-sub-greeting'>about the developers</h1> 
            <div id="about-hr-container-2">
              <hr id="about-hr-2" />
            </div>
              <div id="about-grid-container-2" grid-template-columns="5">
              <div className="about-container-2" id="daphne-about">
                {daphneProfile}
                <h2 className="developer-name" >Daphne Lam</h2>
                <div id="developer-text">
                  <blockquote className='developer-bio'>
                    Daphne enjoys puzzles, reading, running, all forms of movement, and trying new things. 
                    She's also obsessed with her two cats Momo and Ash.
                    <br />
                    <br />
                    <br />
                    <div className='projects-list'>
                      <p id="mini-descriptor">Some of her other projects include:</p>
                      <ul>
                        <li className='project-list-link'>                    
                          // <a href='https://cosmere-pass.onrender.com/'>Cosmerepass</a> (ClassPass Clone)
                        </li>
                        <li className='project-list-link'>
                          // <a href='https://remnantsofred.github.io/momos_misadventures/'>Momo's Misadventures</a> (Minigame Collection)
                        </li>
                      </ul>
                    </div>
                  </blockquote>
                </div>
                <br />
                {daphneSocials}
              </div>
              <div id="about-vr-container-2">
                <hr id="about-vr-2" />
              </div>
              <div className="about-container-2" id="andrea-about">
                {andreaProfile}
                <h2 className="developer-name" >Andrea Cano</h2>
                <blockquote className='developer-bio'>
                  Andrea enjoys socializing and catching up with friends, trying new foods, traveling, and doing any type of sport. At home, she loves spending time with her fiancé and their dog, Dobby.
                  <br />
                  <br />
                  <div className='projects-list'>
                    <p id="mini-descriptor">Some of her other projects include:</p>
                    <ul>
                      <li className='project-list-link'>                    
                        // <a href='https://instapound.onrender.com/'>Instapound</a> (Instagram Clone)
                      </li>
                      <li className='project-list-link'>
                        // <a href='https://andreacanog.github.io/XmasClash/'>X-Mas Clash</a> (Tile Switch Game)
                      </li>
                    </ul>
                  </div>
                </blockquote>
                 <br />
                 {andreaSocials}
              </div>
                <div id="about-vr-container-3">
                <hr id="about-vr-3" />
              </div>
              <div className="about-container-2" id="nathan-about">
                {nathanProfile}
                <h2 className="developer-name" >Nathan Kwon</h2>
                <blockquote className='developer-bio'>
                  In his spare time, Nathan likes reading, sampling coffee, cooking new foods, listening to all sorts of metal, and annoying his cat, Artemis, with lots of love and affection.
                  <br />
                  <br />
                  <br />
                  <div className='projects-list'>
                    <p id="mini-descriptor">Some of his other projects include:</p>
                    <ul>
                      <li className='project-list-link'>                    
                        // <a href='https://haeuncreative.github.io/mosatic/'>Mosatic</a> (Interactive Music App)
                      </li>
                      <li className='project-list-link'>
                        // <a href='https://tremolo.onrender.com/'>Tremolo</a> (Reverb Clone)
                      </li>
                    </ul>
                  </div>

                </blockquote>
                 <br />
                 {nathanSocials}
              </div>
            </div>
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
      <div class={isDisobey ? "cat-activate" : "danger-image"} >
        <img src={DangerImage2} class={isDisobey ? "cat-activate" : "danger-image"} />
      </div>
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