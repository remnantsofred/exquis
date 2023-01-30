import ExquisLinkedin from '../../assets/social-media-icons/exquisLinkedin.png'
import { Link } from 'react-router-dom'

const ExquisLinkedinButton = (link) => {
  console.log(link)
  return(
    <a href={link} target="_blank">
      <img className='social-media-button-img' src={ExquisLinkedin} />
    </a>
  )
}
export default ExquisLinkedinButton