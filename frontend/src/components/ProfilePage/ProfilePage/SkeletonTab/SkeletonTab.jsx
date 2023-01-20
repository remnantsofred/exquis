import { Link } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { getSkeletons , fetchSkeletons } from "../../../../store/skeletons";
import { useEffect, useState } from "react";


const SkeletonTab = ({switchValue, userId}) => {

  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const skellies = useSelector(getSkeletons())
  // console.log('store skeletons', (store) => store.skeletons)
  
  useEffect(() => {
    Promise.all([
      dispatch(fetchSkeletons())
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])


  console.log("skellies", skellies)
  
  const skelliesCurrent = [];
  const skelliesOwned = [];
  const skelliesPrevious = [];

  const [isCollab, setIsCollab] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isFinished, setIsFinished] = useState(false)


  const theyCollab = (skellie) => {
    setIsCollab(false)
    if (skellie.collaborators.includes(userId) || skellie.owner === userId) {
      if (skellie.bones.length < skellie.maxBones) {
        setIsCollab(true)
      }
    }
    return isCollab
  }

  const theyOwner = (skellie) => {
    setIsOwner(false)
    if (skellie.owner === userId) {
    setIsOwner(true)
    }
    return isOwner
  } 

  const theyDone = (skellie) => {
    setIsFinished(false)
    if (skellie.collaborators.includes(userId) || skellie.owner === userId) {
      if (skellie.bones.length >= skellie.maxBones) {
        setIsFinished(true)
      }
    }
    return isFinished
  }

  skellies.forEach(skellie => {
    if (theyOwner(skellie)) {
      skelliesOwned.push(skellie)
    } else if (theyDone(skellie)) {
      skelliesPrevious.push(skellie)
    } else if (theyCollab(skellie)) {
      skelliesCurrent.push(skellie)
    }
  })

  for (let i = 0; i < skellies?.length; i++) {
    let skellie = skellies[i]
    if (skellie.owner === userId) {
      skelliesOwned.push(skellie)
    }
  }

  for (let i = 0; i < skellies?.length; i++) { 
    let skellie = skellies[i]
    if (skellie.collaborators.includes(userId)) {
      if ( skellie.bones.length < skellie.maxBones) {
        skelliesCurrent.push(skellie)
      } else {
        skelliesPrevious.push(skellie)
      }
    }
  }


  // const SkellieLinkName = (skellie) => {
  // <Link to={`/skeletons/${skellie.id}`}>
  //   <li id={skellie.id}>
  //     {skellie.title}
  //   </li>
  // </Link>
  // }

  // console.log('skellies in skeletonTab', skellies)

  // if (!skellies) return null;


  switch(switchValue.switchValue) {
    case "current":
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
            {skelliesCurrent}
          </ul>
        </div>
      )
    case "owned":
      return (
        <div className='skeletons-block' id="owned-skeletons-block">
        <h2 className='profile-bottom-title'>Owned Skeletons</h2>
          <ul className='skeletons-block-list' id="owned-skeletons-block-list">
            {skelliesOwned}
          </ul>
        </div>
      )
    case "previous":
      // console.log('hello???')
      return (
        <div className='skeletons-block' id="previous-skeletons-block">
        <h2 className='profile-bottom-title'>Previous Skeletons</h2>
          <ul className='skeletons-block-list' id="previous-skeletons-block-list">
            {skelliesPrevious}
          </ul>
        </div>
      )
    default:
      return (
        <div className='skeletons-block' id="current-skeletons-block">
        <h2 className='profile-bottom-title'>Current Skeletons</h2>
          <ul className='skeletons-block-list' id="current-skeletons-block-list">
          {skelliesCurrent}
          </ul>
        </div>
      )
  }
}

export default SkeletonTab;