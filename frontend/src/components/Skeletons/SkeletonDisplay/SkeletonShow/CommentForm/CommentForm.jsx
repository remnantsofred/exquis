import './CommentForm.css'

const CommentForm = () => {

  // const commenter = CommentProps.commenter.username
  // const commentBody = CommentProps.body

  const commenter = 'jon jon the leprechaun'
  const commentBody = 'anyone over the age of six celebrating a birthday shoudl go to hell'

  return (
    <div id="comment-form-container">
        <h2 for="comment" id="comment-form-label">Thoughts?</h2>
        <br />
        <input name="comment" id="comment-input" />
        <button type="submit" id="submit-comment-button">Submit Your Comment</button>
    </div>
  )
}
export default CommentForm;