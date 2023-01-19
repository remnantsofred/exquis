import React from "react";
import { useDispatch } from "react-redux";
// import { deleteComment, updateComment } from "../../../../store/comment";
import { useState } from "react";
import { deleteComment, updateComment } from "../../../../../store/comments";
import { useSelector } from "react-redux";




const CommentForm = ({comment, skeleton}) => {
  const commentId = comment._id;
  const skeletonId = skeleton._id;
  // const skeletonId = comment.skeletonId === undefined ? comment.skeleton._id : comment.skeletonId;
  const user = useSelector(state => state.session.user);

  const [updatedComment, setUpdatedComment] = useState(comment.text);
  const [updatingComment, setUpdatingComment] = useState(false);

  
  const dispatch = useDispatch();
  
  const handleDelete = (e) => {
      e.preventDefault();
      dispatch(deleteComment(commentId, skeletonId));
      e.target.value = "";
  }

  const handleUpdateSubmit = (e) => {
      e.preventDefault();
      const commentToUpdate = {"author": user._id, "text": updatedComment, "parent": skeleton._id, "_id": comment._id}
      dispatch(updateComment(commentToUpdate));
      setUpdatingComment(false);
      e.target.value = "";

  }

  const handleShowUpdateField = (e) => {
      e.preventDefault();
      setUpdatingComment(true);
  }


  return (
    <>
      <div className="post-index-item-comment" key={user._id}> </div>
    <div className="" >  
            <div>{comment.author.username}</div>
            <div className="" style={{display: !updatingComment ? "block" : "none"}} >{comment.text}</div>
          
        <div className="">
            { (user._id === comment.author._id ) ? <button className="delete-botton" onClick={handleDelete} >Delete</button> : <></>}
            { (user._id === comment.author._id ) ? <button className="update-button" onClick={handleShowUpdateField} >Edit</button> : <></>}
        </div>

        <div className="" style={{display: updatingComment ? "block" : "none"}}>
            <input type="text" className="" placeholder="Update Comment" onChange={(e) => setUpdatedComment(e.target.value)} value={updatedComment} name=""/>
            <button className="" onClick={handleUpdateSubmit}>Save Comment</button>
        </div>

    </div>
    </>
  )
}

export default CommentForm;