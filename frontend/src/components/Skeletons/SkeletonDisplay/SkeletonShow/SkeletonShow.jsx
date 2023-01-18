import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSkeleton, fetchSkeleton, updateSkeleton } from '../../../../store/skeletons'
// import { getUser, fetchUser } from '../../../../store/'
import { useState } from "react"
import DownvoteButton from "../../DownvoteButton"
import UpvoteButton from "../../UpvoteButton"
import CurrentCollaboratorFxn from "./CurrentCollaboratorFxn"
import "./SkeletonShow.css"

const SkeletonShow = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  const { skeletonId } = useParams()
  const skellie = useSelector(getSkeleton(skeletonId))

  // const userById = (userId) => {
  //   const user = useSelector(getUser(userId))
  // }

  console.log(skeletonId)

  useEffect(() => {
    Promise.all([
      dispatch(fetchSkeleton(skeletonId))
    ]).then(()=>{
      setLoaded(true);
    })
  }, [dispatch, skeletonId])

  // useEffect(() => {
  //   dispatch(fetchSkeleton(skeletonId))
  // }, [dispatch, skeletonId])

  console.log('hey look listen! skellie here')
  console.log(skellie)

  const title = skellie.title
  const body = skellie.body
  const skellieOwner = skellie.owner
  const prompt = skellie.prompt
  const maxBones = skellie.maxBones
  const collaboratorIds = skellie.collaborators
  const maxCollaborators = skellie.maxCollaborators
  const tags = skellie.tags
  const likes = skellie.likes
  // const currentCollaborator = CurrentCollaboratorFxn(skellie)

  // const collaborators = collaboratorIds.map(collaboratorId => store)
  const collaborators = [1, 2, 3, 4]
  if (!loaded) {
    return (
      null
    )
  };
  return (
    <>
    <div class="skellie-main-container">
        <div class="show-top">
          <h1 id="skeleton-title">{title}</h1>
          <h3 id="skeleton-owner">{skellieOwner}</h3>
          <h3 id="skeleton-prompt">{prompt}</h3>
        </div>
        <div class="show-middle">
          {/* TODO: 01/17/2023 - We can separate out the body by each bone and map out colors to the owners */}
          <div>
            <p id="skeleton-body">
              {body}
            </p>
            <input />
          </div>
          <div class="collaborator-panel">
            <ul>
              {collaborators.map(collaborator => <li>{"steve the placeholder"}</li>)}
            </ul>
          </div>
        </div>
        <div class="show-bottom">
            <div class="horizontal-skeleton-likes-container">
              <DownvoteButton />
                {likes}
              <UpvoteButton />
            </div>
        </div>
      </div>
        <div class="comments-section">
          
        </div>
        

    </>
  )
}

export default SkeletonShow;

