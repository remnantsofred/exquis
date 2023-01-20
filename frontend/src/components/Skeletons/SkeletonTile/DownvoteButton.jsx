import Downvote from '../../../assets/skeleton_tile/triangle_button_down.png'

const DownvoteButton = () => {

  const handleDownvote = () => {

  }

  return (
    <button onClick={handleDownvote} className="vote-button" id="downvote-button">
      <img src={Downvote} className="vote-button-image" />
    </button>
  )
}

export default DownvoteButton