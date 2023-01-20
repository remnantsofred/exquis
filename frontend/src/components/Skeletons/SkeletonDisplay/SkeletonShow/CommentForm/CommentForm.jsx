import './CommentForm.css'
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteComment, updateComment } from "../../../../../store/comments";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchUsers, getUsers } from "../../../../../store/users";
import { useEffect } from 'react';
import { format } from 'date-fns'



const CommentForm = ({comment, skeleton}) => {
  const user = useSelector(state => state.session.user);

  const [updatedComment, setUpdatedComment] = useState(comment.text);
  const [updatingComment, setUpdatingComment] = useState(false);

  const dispatch = useDispatch();
  
  const handleDelete = (e) => {
      e.preventDefault();
      dispatch(deleteComment(comment._id, skeleton._id));
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
      if (updatingComment) {
      setUpdatingComment(false);
      } else {
        setUpdatingComment(true)
      }
  }


 


  if (comment._id){
      return (
        <>
        
        <div className="post-index-item-comment" key={user._id}> 
            <div className="comment-panel-container" >  
                <Link id="link-to-profile" to={`/users/${comment.author._id}`}>
                    <h3 className="commenter-username" id="commenter-username">{comment.author.username}</h3>
                </Link>
                <p id="comment-timestamp"> {Date(comment.createdAt)}</p>
                <div className="comment-body" style={{display: !updatingComment ? "block" : "none"}} >~ " {comment.text} "</div>
                <div className="" style={{display: updatingComment ? "block" : "none"}}>
                    <textarea className="comment-update-input" id="comment-update-input" placeholder="Update Comment" onChange={(e) => setUpdatedComment(e.target.value)} value={updatedComment} rows="3" columns="40" name=""/>
                    {/* <button className="comment-save-update-button" onClick={handleUpdateSubmit}>Save Comment</button> */}
                </div>
            <div className="owner-comment-class-actions-container">
                { (user._id === comment.author._id ) ? <button className="comment-update-button" onClick={handleShowUpdateField}>Edit</button> : <></>}
                <button className="comment-save-update-button" onClick={handleUpdateSubmit} style={{display: updatingComment ? "block" : "none"}}>Save Comment</button>

                { (user._id === comment.author._id ) ? <button className="comment-delete-button" onClick={handleDelete} >Delete</button> : <></>}    
            </div>
    
            </div>
        </div>
        </>
      )


  }
}

export default CommentForm;