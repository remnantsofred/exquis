import './CommentForm.css'
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteComment, updateComment } from "../../../../../store/comments";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getUsers } from "../../../../../store/users";



const CommentForm = ({comment, skeleton}) => {
  const user = useSelector(state => state.session.user);


  const [updatedComment, setUpdatedComment] = useState(comment.text);
  const [updatingComment, setUpdatingComment] = useState(false);

//   const users = useSelector(getUsers());
//   console.log("users", users)

// console.log("comment", comment)

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
      setUpdatingComment(true);
  }



  if (comment._id){
    // console.log("user: ", user);
    console.log("comment: ", comment);
      return (
        <>
        
        <div className="post-index-item-comment" key={user._id}> 
            <div className="comment-panel-container" >  
                <Link id="link-to-profile" to="">
                    <h3 className="commenter-username" id="commenter-username">{comment.author.username}</h3>
                </Link>
                <p id="comment-timestamp"> {comment.createdAt}</p>
                <div className="comment-body" style={{display: !updatingComment ? "block" : "none"}} >{comment.text}</div>
              
                <div className="">
                    { (user._id === comment.author._id || user._id === comment.author ) ? <button className="delete-botton" onClick={handleDelete} >Delete</button> : <></>}
                    { (user._id === comment.author._id || user._id === comment.author ) ? <button className="update-button" onClick={handleShowUpdateField} >Edit</button> : <></>}
                </div>
    
                <div className="" style={{display: updatingComment ? "block" : "none"}}>
                    <input type="text" className="" placeholder="Update Comment" onChange={(e) => setUpdatedComment(e.target.value)} value={updatedComment} name=""/>
                    <button className="" onClick={handleUpdateSubmit}>Save Comment</button>
                </div>
    
            </div>
        </div>
        </>
      )


  }
}

export default CommentForm;