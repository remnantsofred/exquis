
import "./CommentPanel.css"
import React, { useEffect } from "react";
import CommentForm from "../CommentForm/CommentForm";

const CommentPanel= ({skeleton}) => {

    return (
        <div>
            {skeleton.comments.map((comment) => (
                <CommentForm key={`skellie-comment-form-${comment._id}-${skeleton._id}-${comment.author}`} comment={comment} skeleton={skeleton} />
            )).reverse()}
        </div>
    )

}
export default CommentPanel;
