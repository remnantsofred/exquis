import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateSkeleton } from "../../../../store/skeletons"

function SetCurrentCollaborator(skeletonId, collabObj) {
  const dispatch = useDispatch()
  const skeleton = {
    currentCollaborator: collabObj
  };
  dispatch(updateSkeleton(skeletonId, skeleton))
}

export default SetCurrentCollaborator