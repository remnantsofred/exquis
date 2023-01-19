import Upvote from '../../assets/skeleton_tile/triangle_button_up.png'

const clickHandle = () => {
  return (
  console.log('teehee')
)}

const UpvoteButton = () => {

  return (
    <button onClick={clickHandle} className="vote-button" id="upvote-button">
      <img src={Upvote} className="vote-button-image" />
    </button>
  )
}

export default UpvoteButton