
import { Link } from "react-router-dom"
import "./CommentPanel.css"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkeleton } from "../../../../../store/skeletons";
import { fetchSkeletonComments } from "../../../../../store/comments";
import CommentForm from "../CommentForm/CommentForm";

const CommentPanel= ({skeleton}) => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user);
    // const skeleton = useSelector(getSkeleton);  
   
    // console.log(skeleton, "comments in comment panel")

    // if (skeleton?.comments.length === 0) return null;
  
    // console.log(skeleton.comments);

    return (
        <div>
            {skeleton.comments.map((comment) => (
                <CommentForm key={comment._id} comment={comment} skeleton={skeleton} />
            ))}
        </div>
    )

}
export default CommentPanel;
