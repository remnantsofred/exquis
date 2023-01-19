const TrendingSkellie = ({skellie}) => {
  // const title = skellie.title
  // const likeCount = skellie.likes


  return (
    <li className="trending-bar-list-item">
      <div>
        <p id="trending-title">{skellie.title} </p>
        <p id="trending-likes">// {skellie.likes.length} Votes</p>
      </div>
    </li>
  )
}

export default TrendingSkellie;