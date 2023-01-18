import jwtFetch from './jwt';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';
export const RECEIVE_USER_COMMENTS = 'RECEIVE_USER_COMMENTS';
export const RECEIVE_SKELETON_COMMENTS = 'RECEIVE_SKELETON_COMMENTS';


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

export const receiveSkeletonComments = comments => ({
    type: RECEIVE_SKELETON_COMMENTS,
    comments
});


export const getSkeletonComments = (state, skeletonId) => {
    // console.log("skeletonId inside getSkeletonComments", skeletonId)
    // const comments = Object.values(state.comments);
    // return comments.filter(comment => comment.skeletonId === skeletonId);

    // return Object.values(state.comments).filter(comment => comment.skeletonId === skeletonId);
    // let skeleton = state.entities.skeletons[skeletonId];
    // let comments = skeleton.comments.map(commentId => state.entities.comments[commentId]);
    // return comments;

}



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
        dispatch(receiveSkeletonComments(comments));
    }
}


export const createComment = (newComment, skeletonId )=> async dispatch => {
    console.log("newComment in createComment", newComment)
    console.log("skeletonId in createComment", skeletonId)
    try {
        const res = await jwtFetch(`/api/comments/skeletons/${skeletonId}`, {
            method: 'POST',
            body: JSON.stringify(newComment)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch (err) {
        // const resBody = await err.json();
        // if (resBody.statusCode === 400) {
        //     dispatch(receiveErrors(resBody.errors));
        // }
        console.log("error in createComment")
    }
}

export const updateComment = commentId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${commentId}`, {
            method: 'PATCH',
            body: JSON.stringify(commentId)
        });
        const updatedComment = await res.json();
        dispatch(receiveComment(updatedComment));
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
        dispatch(removeComment(deletedComment));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}


const nullErrors = null; 

export const commentErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case RECEIVE_COMMENT:
        case CLEAR_COMMENT_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}


const commentsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_COMMENT:
            // return { ...state, all: { ...state.all, [action.comment.id]: action.comment}, new: action.comment };
            return { ...newState, [action.comment._id]: action.comment};
        case RECEIVE_COMMENTS:
            return { ...newState, all: action.comments };
        case REMOVE_COMMENT:
            delete newState.all[action.commentId];
            return newState;
        case RECEIVE_USER_COMMENTS:
            return { ...newState, user: action.comments };
        case RECEIVE_SKELETON_COMMENTS:
            return { ...newState, skeleton: action.comments};
        default:
            return state;
    }
}

export default commentsReducer;
