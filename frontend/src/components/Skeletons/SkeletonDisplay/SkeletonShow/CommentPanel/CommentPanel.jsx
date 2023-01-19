
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
   
console.log("comments in commentPanel", comments)

    if (!comments) return null;
  

    return (
        <div>
            {comments.map((comment) => (
                <CommentForm key={comment._id} comment={comment} skeleton={skellie} />
            ))}
        </div>
    )

}
export default CommentPanel;
