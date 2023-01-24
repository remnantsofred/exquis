import { fetchSkeletonComments } from './comments';
import jwtFetch from './jwt';
import { fetchSkeleton } from "./skeletons";
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

const removeLike = (skeletonId, currentUserId) => ({
    type: REMOVE_LIKE,
    skeletonId,
    currentUserId
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
    console.log("hittingfetchSkeletonLikesLocal")
    
    const res = await fetch(`/api/likes/skeletons/${skeletonId}`);
    console.log(res, "res from fetchSkeletonLikesLocal")
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveSkeletonLikes(skeletonId, data));
    }
}



export const createLike = (newLike, skeletonId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/likes/skeletons/${skeletonId}`, {
            method: 'POST',
            body: JSON.stringify(newLike)
        });
        const like = await res.json();
        dispatch(receiveLike(like));
        dispatch(fetchSkeletonLikesLocal(skeletonId))
        // dispatch(fetchSkeleton(skeletonId))
        return(like)
    } catch (err) {
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



export const deleteLike = (skeletonId, currentUserId) => async (dispatch) => {
    const response = await jwtFetch(`/api/likes/skeletons/${skeletonId}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({currentUserId: currentUserId})
    });
    dispatch(removeLike(skeletonId, currentUserId));
    // dispatch(fetchSkeleton(skeletonId))
    return response;
}


const likesReducer = (state = {  }, action) => {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_LIKE:
            return {...newState, [action.like._id]: action.like };
        case RECEIVE_LIKES:
            return { ...newState, ...action.likes};
        case REMOVE_LIKE:
            return {}
        case RECEIVE_SKELETON_LIKES:
            return {...newState, ...action.skeletonId.likes};
        default:
            return state;
    }
}

export default likesReducer;