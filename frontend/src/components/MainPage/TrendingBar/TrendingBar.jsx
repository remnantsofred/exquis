import TrendingSkellie from "./TrendingSkellie"

const TrendingBar = ({skellies}) => {

  skellies = [1, 2, 3, 4]

  return (
    <div className="trending-bar-container">
      <ul className="trending-bar-list">
        {skellies.map(skellie => <TrendingSkellie component={skellie} />)}
      </ul>
    </div>

  )

}

export default TrendingBar;