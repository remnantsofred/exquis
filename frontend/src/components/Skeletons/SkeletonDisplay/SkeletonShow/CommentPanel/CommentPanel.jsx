import { Link } from "react-router-dom"
import "./CommentPanel.css"

const CommentPanel = ({CommentProps}) => {

  // const commenter = CommentProps.commenter.username
  // const commentBody = CommentProps.body

  const commenter = 'jon jon the leprechaun'
  const commentBody = 'anyone over the age of six celebrating a birthday shoudl go to hell'
  const timestamps = 'some day, some where'
  return (
    <div className="comment-panel-container">
      <Link id="link-to-profile" to="">
        <h3 className="commenter-username" id="commenter-username">{commenter}</h3>
      </Link>
      <p id="comment-timestamp"> // {timestamps}</p>
        <p className="comment-body">~"{commentBody}"</p>
    </div>
  )
}
export default CommentPanel;