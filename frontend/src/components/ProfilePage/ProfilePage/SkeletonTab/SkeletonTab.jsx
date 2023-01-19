import { Link } from "react-router-dom"

const SkeletonTab = (switchValue) => {


  // const SkellieLinkName = (skellie) => {
  // <Link to={`/skeletons/${skellie.id}`}>
  //   <li id={skellie.id}>
  //     {skellie.title}
  //   </li>
  // </Link>
  // }


  switch(switchValue.switchValue) {
    case "current":
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
            {/* {skellies.map(skellie => <SkellieLinkName skellie={skellie} />)} */}
          </ul>
        </div>
      )
    case "owned":
      return (
        <div className='skeletons-block' id="owned-skeletons-block">
        <h2 className='profile-bottom-title'>Owned Skeletons</h2>
          <ul className='skeletons-block-list' id="owned-skeletons-block-list">
            {/* {skellies.map(skellie => <SkellieLinkName skellie={skellie} />)} */}
          </ul>
        </div>
      )
    case "previous":
      // console.log('hello???')
      return (
        <div className='skeletons-block' id="previous-skeletons-block">
        <h2 className='profile-bottom-title'>Previous Skeletons</h2>
          <ul className='skeletons-block-list' id="previous-skeletons-block-list">
            {/* {skellies.map(skellie => <SkellieLinkName skellie={skellie} />)} */}
          </ul>
        </div>
      )
    default:
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
            {/* {skellies.map(skellie => <SkellieLinkName skellie={skellie} />)} */}
          </ul>
        </div>
      )
  }
}

export default SkeletonTab;