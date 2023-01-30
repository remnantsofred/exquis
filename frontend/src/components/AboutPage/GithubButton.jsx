import ExquisGithub from '../../assets/social-media-icons/exquisGithub.png'
import { Link } from 'react-router-dom'

const ExquisGithubButton = (link) => {

  return(
    <a href={link} target="_blank">
      <img className='social-media-button-img' src={ExquisGithub} />
    </a>
  )
}
export default ExquisGithubButton