

const CommentPanel = ({CommentProps}) => {

  // const commenter = CommentProps.commenter.username
  // const commentBody = CommentProps.body

  const commenter = 'jon jon the leprechaun'
  const commentBody = 'anyone over the age of six celebrating a birthday shoudl go to hell'

  return (
    <div>
        <h3>{commenter}</h3>
        <p>{commentBody}</p>
    </div>
  )
}
export default CommentPanel;