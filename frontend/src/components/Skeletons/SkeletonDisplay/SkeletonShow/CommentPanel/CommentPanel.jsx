
import { Link } from "react-router-dom"
import "./CommentPanel.css"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkeleton } from "../../../../../store/skeletons";
import { fetchSkeletonComments } from "../../../../../store/comments";
import CommentForm from "../CommentForm/CommentForm";

const CommentPanel= ({skeleton}) => {
    const dispatch = useDispatch();

    return (
        <div>
            {skeleton.comments.map((comment) => (
                <CommentForm key={comment._id} comment={comment} skeleton={skeleton} />
            )).reverse()}
        </div>
    )

}
export default CommentPanel;
