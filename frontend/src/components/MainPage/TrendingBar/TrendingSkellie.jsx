import { Link } from "react-router-dom"

const TrendingSkellie = ({skellie}) => {
  // const title = skellie.title
  // const likeCount = skellie.likes
   const skeletonId = skellie._id

  return (
    <li className="trending-bar-list-item">
      <div>
        <Link to={`/skeletons/${skeletonId}`} id="gen-title-link">
          <p id="trending-title">{skellie.title} </p>
        </Link>
        <p id="trending-likes">/////////////// {skellie.likes.length} Votes</p>
      </div>
    </li>
  )
}

export default TrendingSkellie;