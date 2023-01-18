import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSkeleton, fetchSkeleton, updateSkeleton } from '../../../../store/skeletons'
// import { getUser, fetchUser } from '../../../../store/'

import PlaceBones from "./PlaceBones"
import DownvoteButton from "../../DownvoteButton"
import UpvoteButton from "../../UpvoteButton"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"
import "./SkeletonShow.css"

const SkeletonShow = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  const { skeletonId } = useParams()
  const skellie = useSelector(getSkeleton(skeletonId))

  const tempBones = [
    "As she sat watching the world go by, something caught her eye.",
    "It wasn't so much its color or shape, but the way it was moving.",
    "She squinted to see if she could better understand what it was and where it was going, but it didn't help.",
    "As she continued to stare into the distance, she didn't understand why this uneasiness was building inside her body.", 
    "She felt like she should get up and run.",
    "If only she could make out what it was.",
    "At that moment, she comprehended what it was and where it was heading, and she knew her life would never be the same."
  ]

  console.log(tempBones)
  const bones = PlaceBones(tempBones)

  // const userById = (userId) => {
  //   const user = useSelector(getUser(userId))
  // }

  console.log("components skeletonId:", skeletonId)

  useEffect(() => {
    Promise.all([
      dispatch(fetchSkeleton(skeletonId))
    ]).then(()=>{
      setLoaded(true);
    })
  }, [dispatch, skeletonId])

  // TODO 01/18/2023 - add length constraint on prompt

  // const currentCollaborator = CurrentCollaboratorFxn(skellie)
  const currentCollaborator = 'nathan, the wondrous'
  // const collaborators = collaboratorIds.map(collaboratorId => store)
  if (!loaded) {
    return (
      null
    )
  };
  return (
    <>
    <div class="skellie-main-container">
      <div class="show-top-middle">
        <div class="show-top">
          <h1 id="skeleton-title">{skellie.title}</h1>
            <hr />
              <div className="sub-title">
                <h3 id="skeleton-owner">{skellie.owner.username}</h3>
                <h3 id="skeleton-prompt">"{skellie.prompt}"</h3>
              </div>
            <hr />
        </div>
        <div class="show-middle">
          {/* TODO: 01/17/2023 - We can separate out the body by each bone and map out colors to the owners */}
          <div className="skeleton-body-input-container">
            <div id="skeleton-body">
              {bones}
            </div>
            <div class="user-input-div">
              <hr id="body-input-divider" />
              <div id="current-writer-note" ><span>It is</span><span id="current-writer-username">{`${currentCollaborator}`}'s</span><span>turn.</span></div>
              {/* TODO - 01/18/2023 - we could disable or erase this panel depending on if it matches w current user */}
              <textarea id="current-collab-input" />
            </div>
            <div class="horizontal-skeleton-likes-container">
              <DownvoteButton />
                <h1>{skellie.likes}</h1>
              <UpvoteButton />
            </div>
          </div>
        </div>
      </div>
        <div class="collaborator-panel">
          <ul>

          </ul>
        </div>
        <div class="show-bottom">

        </div>
      </div>
        
      <div class="comments-section">
          
      </div>

    </>
  )
}

export default SkeletonShow;


