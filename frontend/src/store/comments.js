import jwtFetch from './jwt';
import { fetchSkeleton } from './skeletons';

export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'comments/RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'comments/CLEAR_COMMENT_ERRORS';
export const RECEIVE_USER_COMMENTS = 'comments/RECEIVE_USER_COMMENTS';
export const RECEIVE_SKELETON_COMMENTS = 'comments/RECEIVE_SKELETON_COMMENTS';


// ACTION CREATORS
export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

export const receiveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_COMMENT_ERRORS
});

export const receiveUserComments = comments => ({
    type: RECEIVE_USER_COMMENTS,
    comments
});

export const receiveSkeletonComments = (skeletonId, comments) => ({
    type: RECEIVE_SKELETON_COMMENTS,
    skeletonId,
    comments
});


// export const getSkeletonComments = (state, skeletonId) => {
//     // const comments = Object.values(state.comments);
//     // return comments.filter(comment => comment.skeletonId === skeletonId);

//     // return Object.values(state.comments).filter(comment => comment.skeletonId === skeletonId);
//     // let skeleton = state.entities.skeletons[skeletonId];
//     // let comments = skeleton.comments.map(commentId => state.entities.comments[commentId]);
//     // return comments;

// }



// THUNK ACTION CREATORS

export const fetchComments = () => async dispatch => {
    const res = await fetch('/api/comments');
    if (res.ok) {
        const comments = await res.json();
        dispatch(receiveComments(comments));
    }
}

export const fetchUserComments = userId => async dispatch => {
    const res = await fetch(`/api/comments/users/${userId}`);
    if (res.ok) {
        const comments = await res.json();
        dispatch(receiveUserComments(comments));
    }
}


export const fetchSkeletonComments = skeletonId => async dispatch => {
    const res = await fetch(`/api/comments/skeletons/${skeletonId}`);
    if (res.ok) {
        const comments = await res.json();
        dispatch(receiveSkeletonComments(skeletonId, comments));
        // dispatch(receiveSkeletonComments(comments));
    }
}
const fetchSkeletonCommentsLocal = skeletonId => async dispatch => {
    const res = await fetch(`/api/comments/skeletons/${skeletonId}`);
    if (res.ok) {
        const comments = await res.json();
        dispatch(receiveSkeletonComments(skeletonId, comments));
    }
}


export const createComment = (newComment, skeletonId )=> async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/skeletons/${skeletonId}`, {
            method: 'POST',
            body: JSON.stringify(newComment)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
        fetchSkeletonCommentsLocal(skeletonId);
    } catch (err) {
        console.log(err);
    }
}

export const updateComment = comment => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${comment._id}`, { // /api/comments/skeletons/${skeletonId}/${commentId}
            method: 'PATCH',
            body: JSON.stringify(comment)
        });
        const updatedComment = await res.json();
        dispatch(receiveComment(updatedComment));
        dispatch(fetchSkeleton(updatedComment.parent));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}


export const deleteComment = commentId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        });
        const deletedComment = await res.json();
        dispatch(removeComment(deletedComment._id))
        dispatch(fetchSkeleton(deletedComment.parent));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors))
        }
    }
}


const nullErrors = null; 

export const commentErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        // case RECEIVE_COMMENT:
        case CLEAR_COMMENT_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}

const commentsReducer = (state = {  }, action) => {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_COMMENT:
            // debugger
            // return { ...state, all: { ...state.all, [action.comment.id]: action.comment}, new: action.comment };
            // return newState[action.comments.comment_id];
            return { ...newState, [action.comment._id]: action.comment};
            // return {...newState, [action.comment.parent]: {...newState[action.comment.parent], comments: [...newState[action.comment.parent].comments, action.comment]}}

        case RECEIVE_COMMENTS:
            return { ...newState, ...action.comments };
        case REMOVE_COMMENT:
            newState = {};
            return newState;
        case RECEIVE_USER_COMMENTS:
            return { ...newState, ...action.comments };
        // case RECEIVE_SKELETON_COMMENTS:
        //     return { ...newState, ...action.skeletons.skeleton._id.comment};
        default:
            return state;
    }
}
export default commentsReducer;
