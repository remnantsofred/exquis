
import { Link } from "react-router-dom"
import "./CommentPanel.css"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkeleton } from "../../../../../store/skeletons";
import { fetchSkeletonComments } from "../../../../../store/comments";
import CommentForm from "../CommentForm/CommentForm";

const CommentPanel= ({skeletonId, skellie, comments}) => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user);
    const skeleton = useSelector(getSkeleton);  
   


    if (!comments) return null;
  

    return (
        <div>
            {comments.map((comment, idx) => (
                <CommentForm key={idx} comment={comment} skeleton={skellie} />
            ))}
        </div>
        // <div>
        //     {comments.map((comment, idx) => (
        //         <CommentForm key={idx} comment={comment} skeleton={skeleton} />
        //     ))}
        // </div>
    )
}


  const commenter = 'jon jon the leprechaun'
  const commentBody = 'anyone over the age of six celebrating a birthday shoudl go to hell'
  const timestamps = 'some day, some where'
  return (
    <div className="comment-panel-container">
      <Link id="link-to-profile" to="">
        <h3 className="commenter-username" id="commenter-username">{commenter}</h3>
      </Link>
      <p id="comment-timestamp"> // {timestamps}</p>
        <p className="comment-body">~"{commentBody}"</p>
    </div>
  )
}
export default CommentPanel;
