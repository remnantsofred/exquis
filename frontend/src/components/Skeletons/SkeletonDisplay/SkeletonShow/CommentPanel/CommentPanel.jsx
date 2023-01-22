
import "./CommentPanel.css"
import React, { useEffect } from "react";
import CommentForm from "../CommentForm/CommentForm";

const CommentPanel= ({skeleton}) => {

    return (
        <div>
            {skeleton.comments.map((comment) => (
                <CommentForm key={comment._id} comment={comment} skeleton={skeleton} />
            )).reverse()}
        </div>
    )

}
export default CommentPanel;
