import TrendingSkellie from "./TrendingSkellie"
import './TrendingBar.css'
const TrendingBar = ({skeletons}) => {

  const skeletonsCopy = JSON.parse(JSON.stringify(skeletons))
  skeletonsCopy.sort((a, b) => b.likes.length - a.likes.length)

  const topFive = skeletonsCopy.slice(0, 5)
  const TrendingSayings = [
    "Here's what's currently poppin! 🔥🔥",
    "Currently on their way to fame - ✨✨",
    "These current picks are too good to pass up~ 💅💅"
  ]

  const randomSayingFxn = (array) => {
    return (
      array[Math.floor((Math.random() * (array.length)))]
    )
  };  

  const saying = randomSayingFxn(TrendingSayings)

  return (
    <div className="trending-bar-container">
      <h1 id="trending-bar-header">{saying}</h1>
      <hr id="trending-hl"/>
      <ol className="trending-bar-list">
        {topFive.map((skellie, idx) => 
        <TrendingSkellie 
          component={skellie} 
          key={idx}
          skellie={skellie}
        />)}
      </ol>
    </div>

  )

}

export default TrendingBar;