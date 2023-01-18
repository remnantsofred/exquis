import jwtFetch from './jwt';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';
export const RECEIVE_USER_COMMENTS = 'RECEIVE_USER_COMMENTS';
export const RECEIVE_SKELETON_COMMENTS = 'RECEIVE_SKELETON_COMMENTS';

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


export const fetchComments = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/comments');
        const comments = await res.json();
        dispatch(receiveComments(comments));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const fetchUserComments = userId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/users/${userId}`);
        const comments = await res.json();
        dispatch(receiveUserComments(comments));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const fetchSkeletonComments = skeletonId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/skeletons/${skeletonId}`);
        const comments = await res.json();
        dispatch(receiveSkeletonComments(comments));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}


export const createComment = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const newComment = await res.json();
        dispatch(receiveComment(newComment));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
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
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return { ...state, all: action.comments, user: action.comments };
        case RECEIVE_COMMENT:
            return { ...state, all: { ...state.all, [action.comment.id]: action.comment}, new: action.comment };
            // return { ...state, new: action.comment};
        case REMOVE_COMMENT:
            const newState = { ...state };
            delete newState.all[action.commentId];
            return newState;
        case RECEIVE_USER_COMMENTS:
            return { ...state, user: action.comments, new: undefined };
        case RECEIVE_SKELETON_COMMENTS:
            return { ...state, skeleton: action.comments, new: undefined };
        default:
            return state;
    }
}

export default commentsReducer;
