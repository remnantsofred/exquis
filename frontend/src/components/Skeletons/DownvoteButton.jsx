import Downvote from '../../assets/skeleton_tile/triangle_button_down.png'

const clickHandle = () => {

}

const DownvoteButton = () => {

  return (
    <button onClick={clickHandle} className="vote-button" id="downvote-button">
      <img src={Downvote} className="vote-button-image" />
    </button>
  )
}

export default DownvoteButton