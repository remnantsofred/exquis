import Downvote from '../../../assets/skeleton_tile/triangle_button_down.png'

const DownvoteButton = () => {

  return (
    <button onClick={""} className="vote-button" id="downvote-button">
      <img src={Downvote} className="vote-button-image" />
    </button>
  )
}

export default DownvoteButton