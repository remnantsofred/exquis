import React from "react";
import { useDispatch } from "react-redux";
// import { deleteComment, updateComment } from "../../../../store/comment";
import { useState } from "react";
import { deleteComment, updateComment } from "../../../../../store/comment";




const CommentForm = ({comment, user, skeleton}) => {
  const commentId = comment._id;
  const skeletonId = comment.skeletonId === undefined ? comment.skeleton._id : comment.skeletonId;

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
      const commentToUpdate = {comment: {userId: user._id, text: updatedComment, skeletonId: skeleton._id, commentId: comment._id}}
      dispatch(updateComment(commentToUpdate));
      setUpdatingComment(false);
      e.target.value = "";

  }

  const handleShowUpdateField = (e) => {
      e.preventDefault();
      setUpdatingComment(true);
  }


  return (
    <div className="" key={comment._id}>  
            <div className="" style={{display: !updatingComment ? "block" : "none"}} >{comment.text}</div>
          
        <div className="">
            { (user._id === comment.user_id || user._id === comment.userId) ? <button className="delete-botton" onClick={handleDelete} >Delete</button> : <></>}
            { (user._id === comment.user_id || user._id === comment.userId) ? <button className="update-button" onClick={handleShowUpdateField} >Edit</button> : <></>}
        </div>

        <div className="" style={{display: updatingComment ? "block" : "none"}}>
            <input type="text" className="" placeholder="Update Comment" onChange={(e) => setUpdatedComment(e.target.value)} value={updatedComment} name=""/>
            <button className="" onClick={handleUpdateSubmit}>Save Comment</button>
        </div>

    </div>

  )
}

export default CommentForm;