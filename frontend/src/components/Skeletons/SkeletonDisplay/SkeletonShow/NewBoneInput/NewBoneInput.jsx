import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkeleton, updateSkeleton } from "../../../../../store/skeletons";
import { fetchBone, createBone } from "../../../../../store/bones";
import { useParams } from "react-router-dom";


const NewBoneInput = ({skellie, currentCollabId, authorId}) => {
  const dispatch = useDispatch()
  const author = useSelector(state => state.session.user);
  const [newBoneText, setNewBoneText] = useState("")
  const [isCurrentCollab, setIsCurrentCollab] = useState(false)

  useEffect(() => {
    if (CurrentCollabId === authorId) {
      setIsCurrentCollab(true)
    } else {
      setIsCurrentCollab(false)
    }
  }, [CurrentCollabId, authorId])


  const skellieId = skellie._id
  const createNewBone = (e) => {
    e.preventDefault()
    const data = {
      text: newBoneText,
      skeleton: skellieId,
      author: authorId
    }
    dispatch(createBone(skellieId, data))
  }

  if (currentCollabId === null || authorId === null) {
    return 
  } else {
    return (
      <div style={{display: isCurrentCollab ? "block" : "none"}}>
      <form id="new-bone-form" onSubmit={createNewBone}>
        <textarea id="current-collab-input" 
          value={newBoneText}
          onChange={(e) => setNewBoneText(e.target.value)}
        />
        <button type="submit" id="bone-submit-button">
            Submit Your Bone.
        </button>
      </form>
      </div>
    )

  }
}

export default NewBoneInput;
