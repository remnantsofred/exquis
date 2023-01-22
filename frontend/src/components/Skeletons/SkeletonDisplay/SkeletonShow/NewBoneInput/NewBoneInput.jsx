import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkeleton, updateSkeleton } from "../../../../../store/skeletons";
import { fetchBone, createBone } from "../../../../../store/bones";
import { useParams } from "react-router-dom";

const NewBoneInput = (skellie) => {
  const dispatch = useDispatch()
  const author = useSelector(state => state.session.user);
  const [newBoneText, setNewBoneText] = useState("")

  const skellieId = skellie.skellie._id

  const createNewBone = (e) => {
    e.preventDefault()
    const authorId = author._id;
    const data = {
      text: newBoneText,
      skeleton: skellieId,
      author: authorId
    }
    dispatch(createBone(skellieId, data))
   
  }

  
  return (
    <>
    <form onSubmit={createNewBone}>
      <textarea id="current-collab-input" 
        value={newBoneText}
        onChange={(e) => setNewBoneText(e.target.value)}
      />
      <button type="submit">
          Submit Your Bone.
      </button>
    </form>
    </>
  )
}

export default NewBoneInput;