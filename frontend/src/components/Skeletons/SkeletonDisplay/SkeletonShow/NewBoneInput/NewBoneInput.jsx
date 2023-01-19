import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkeleton, updateSkeleton } from "../../../../../store/skeletons";
import { fetchBone, createBone } from "../../../../../store/bones";

const NewBoneInput = (skellie) => {
  const dispatch = useDispatch()
  const author = useSelector(state => state.session.user);
  const [newBoneText, setNewBoneText] = useState("")
  const [bones, setBones] = useState([])
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [maxBones, setMaxBones] = useState(0)
  const [maxCollaborators, setMaxCollaborators] = useState(0)
  const [collaborators, setCollaborators] = useState([])
  const [tags, setTags] = useState([])
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  console.log(skellie)
  console.log("HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
  // console.log(skellie)
  const skellieId = skellie.skellie._id
  console.log(author)

  let tempId

  useEffect(() => {
    dispatch(fetchSkeleton(skellieId))
    setBones(skellie.skellie.bones)
    setTitle(skellie.skellie.title)
    setPrompt(skellie.skellie.prompt)
    setMaxBones(skellie.skellie.maxBones)
    setMaxCollaborators(skellie.skellie.maxCollaborators)
    setLikes(skellie.skellie.likes)
    setTags(skellie.skellie.tags)
    setComments(skellie.skellie.comments)
  }, [skellieId])

  const createNewBone = (e) => {
    e.preventDefault()
    const authorId = author._id;
    console.log(authorId)
    console.log(newBoneText)
    const data = {
      text: newBoneText,
      skeleton: skellieId,
      author: authorId
    }
    dispatch(createBone(skellieId, data))
    .then((newBone) => {
      setBones(skellie.bones)
      console.log(bones)
      bones.push(newBone)
      console.log(bones)

      const data = {
      bones: bones,
      title: title,
      prompt: prompt,
      maxBones: maxBones,
      maxCollaborators: maxCollaborators,
      collaborators: collaborators,
      tags: tags,
      likes: likes,
      comments: comments
    }
    console.log("hey! here here here")
    dispatch(updateSkeleton(skellieId, data))
    }
    )
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