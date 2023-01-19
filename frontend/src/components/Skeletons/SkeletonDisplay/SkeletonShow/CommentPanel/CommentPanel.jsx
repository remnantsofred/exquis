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

export default CommentPanel;




// const CommentPanel = ({CommentProps}) => {

//   // const commenter = CommentProps.commenter.username
//   // const commentBody = CommentProps.body

//   const commenter = 'jon jon the leprechaun'
//   const commentBody = 'anyone over the age of six celebrating a birthday shoudl go to hell'

//   return (
//     <div>
//         <h3>{commenter}</h3>
//         <p>{commentBody}</p>
//     </div>
//   )
// }
// export default CommentPanel;
