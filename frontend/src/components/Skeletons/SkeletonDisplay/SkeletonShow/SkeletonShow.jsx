import DownvoteButton from "../../DownvoteButton"
import UpvoteButton from "../../UpvoteButton"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"
import "./SkeletonShow.css"
const SkeletonShow = ({ Skellie }) => {
  const title = Skellie.title
  const body = Skellie.body
  const skellieOwner = Skellie.skellieOwner
  const prompt = Skellie.prompt
  const maxBones = Skellie.maxBones
  const collaborators = Skellie.collaborators
  const maxCollaborators = Skellie.maxCollaborators
  const tags = Skellie.tags
  const likes = Skellie.likes
  const currentCollaborator = CurrentCollaboratorFxn(Skellie)

  return (
    <>
      <div class="show-top">
        <h1 id="skeleton-title">{title}</h1>
        <h3 id="skeleton-owner">{skellieOwner}</h3>
      </div>
      <div class="show-middle">
        {/* TODO: 01/17/2023 - We can separate out the body by each bone and map out colors to the owners */}
        <div>
          <p id="skeleton-body">
            {body}
          </p>
          <input />
        </div>
        <div class="collaborator-panel">
          <ul>
            {collaborators.map(collaborator => <li><h3>collaborator.username</h3></li>)}
          </ul>
        </div>
      </div>
      <div class="show-bottom">
          <div class="horizontal-skeleton-likes-container">
            <DownvoteButton />
              {likes}
            <UpvoteButton />
          </div>
      </div>
      <div class="comments-section">
        
      </div>
    </>
  )
}

export default SkeletonShow;