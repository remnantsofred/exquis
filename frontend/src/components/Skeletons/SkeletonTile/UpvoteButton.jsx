import Upvote from '../../../assets/skeleton_tile/triangle_button_up.png'

const UpvoteButton = () => {

  const handleUpvote = () => {

  }

  return (
    <button onClick={handleUpvote} className="vote-button" id="upvote-button">
      <img src={Upvote} className="vote-button-image" />
    </button>
  )
}

export default UpvoteButton