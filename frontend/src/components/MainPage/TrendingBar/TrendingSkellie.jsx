const TrendingSkellie = (skellie) => {
  // const title = skellie.title
  // const likeCount = skellie.likes

  const title = "You'll Never Guess What Happens Next!"
  const likeCount = 200000

  return (
    <li className="trending-bar-list-item">
      <div>
        <h2>{title}</h2>
        <p>{likeCount}</p>
      </div>
    </li>
  )
}

export default TrendingSkellie;