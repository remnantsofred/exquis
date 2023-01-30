import GithubButton from './GithubButton'
import LinkedinButton from './LinkedinButton'

const SocialLinkDiv = (github, linkedin) => {
  return (
    <div id="social-media-button-div">
      {GithubButton(github)}
      {LinkedinButton(linkedin)}
    </div>
  )
}

export default SocialLinkDiv;