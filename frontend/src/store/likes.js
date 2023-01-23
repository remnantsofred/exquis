import { fetchSkeletonComments } from './comments';
import jwtFetch from './jwt';
// import { fetchSkeleton, fetchSkeletons } from './skeletons';


export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE';
export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES';
export const REMOVE_LIKE = 'likes/REMOVE_LIKE';
export const RECEIVE_SKELETON_LIKES = 'likes/RECEIVE_SKELETON_LIKES';


const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like
});

const receiveLikes = (likes) => ({
    type: RECEIVE_LIKES,
    likes
});

const removeLike = (like) => ({
    type: REMOVE_LIKE,
    like
});

const receiveSkeletonLikes = (skeletonId, likes) => ({
    type: RECEIVE_SKELETON_LIKES,
    likes,
    skeletonId
});


export const getLikes = () => async (dispatch) => {
    const response = await jwtFetch('/api/likes/');
    const data = await response.json();
    dispatch(receiveLikes(data));
    return response;
}

const fetchSkeletonLikesLocal = skeletonId => async dispatch => {
    const res = await fetch(`/api/likes/skeletons/${skeletonId}`);
    if (res.ok) {
        const data = await res.json();
        console.log("fetchSkeletonLikes: ", data)
        dispatch(receiveSkeletonLikes(skeletonId, data));
    }
}

// const fetchSkeletonCommentsLocal = skeletonId => async dispatch => {
//     const res = await fetch(`/api/comments/skeletons/${skeletonId}`);
//     if (res.ok) {
//         const comments = await res.json();
//         dispatch(receiveSkeletonComments(skeletonId, comments));
//     }
// }



export const createLike = (newLike, skeletonId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/likes/skeletons/${skeletonId}`, {
            method: 'POST',
            body: JSON.stringify(newLike)
        });
        const like = await res.json();
        dispatch(receiveLike(like));
        // dispatch(fetchSkeletons);
        fetchSkeletonLikesLocal(skeletonId);
        console.log("after fetch");
    } catch (err) {
        console.log(err);
    }
}




export const updateLike = (like) => async (dispatch) => {
    const response = await jwtFetch(`/api/likes/${like.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(like)
    });
    const data = await response.json();
    dispatch(receiveLike(data));
    return response;
}



export const deleteLike = (likeId) => async (dispatch) => {
    console.log("deleteLike: ", likeId)
    const response = await jwtFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    });
    dispatch(removeLike(likeId));
    return response;
}


const likesReducer = (state = {  }, action) => {
    // console.log("hit reducer: ", action)
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_LIKE:
            return {...newState, [action.like.id]: action.like };
        case RECEIVE_LIKES:
            return { ...newState, ...action.likes};
        case REMOVE_LIKE:
            // const newState = { ...state };
            delete newState[action.like.id];
            return newState;
        case RECEIVE_SKELETON_LIKES:
            return {...newState, ...action.skeletonId.likes};
        default:
            return state;
    }
}

export default likesReducer;