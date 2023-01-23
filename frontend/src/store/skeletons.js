import jwtFetch from "./jwt";
import { RECEIVE_SKELETON_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from "./comments";
import { RECEIVE_SKELETON_LIKES, RECEIVE_LIKE, REMOVE_LIKE } from "./likes";


export const RECEIVE_SKELETON = "skeletons/RECEIVE_SKELETON";
export const RECEIVE_SKELETONS = "skeletons/RECEIVE_SKELETONS";
export const REMOVE_SKELETON = "skeletons/REMOVE_SKELETON";
export const RECEIVE_SKELETON_ERRORS = "skeletons/RECEIVE_SKELETON_ERRORS";
export const CLEAR_SKELETON_ERRORS = "skeletons/CLEAR_SKELETON_ERRORS";
export const RECEIVE_USER_SKELETONS = "skeletons/RECEIVE_USER_SKELETONS";


// ACTION CREATORS
const receiveSkeleton = skeleton => ({
  type: RECEIVE_SKELETON,
  skeleton
});

const receiveSkeletons = skeletons => ({
  type: RECEIVE_SKELETONS,
  skeletons
});

const removeSkeleton = skeletonId => ({
  type: REMOVE_SKELETON,
  skeletonId
});

const receiveErrors = errors => ({
  type: RECEIVE_SKELETON_ERRORS,
  errors
});

const clearErrors = () => ({
  type: CLEAR_SKELETON_ERRORS
});

const receiveUserSkeletons = skeletons => ({
  type: RECEIVE_USER_SKELETONS,
  skeletons
});


export const getSkeletons = (store) => { 
  if (store.skeletons) return Object.values(store.skeletons);
  return [];
}; 

export const getSkeleton = (skeletonId) => (store) => {
  if (store.skeletons && store.skeletons[skeletonId]) return store.skeletons[skeletonId];
  return null;
};


export const getCommentsForSkeleton = (state, skeletonId) => {
  let skeleton = state?.skeletons[skeletonId]
  // return skeleton.comments ? Object.values(skeleton.comments) : [];
  return skeletonId.comments ? Object.values(skeleton.comments) : [];
}



export const fetchSkeletons = () => async (dispatch) => {
  const res = await fetch('/api/skeletons');
  if (res.ok) {
    const skeletons = await res.json();
    dispatch(receiveSkeletons(skeletons));
    return Promise.resolve();
  }
};


export const fetchSkeleton = (skeletonId) => async (dispatch) => {
  const res = await fetch(`/api/skeletons/${skeletonId}`);
  if (res.ok) {
    const skeleton = await res.json();
    dispatch(receiveSkeleton(skeleton));
    return Promise.resolve();
  }
}


export const createSkeleton = data => async dispatch => {
  try {
      const res = await jwtFetch('/api/skeletons/', {
          method: 'POST',
          body: JSON.stringify(data)
      });
      const newSkeleton = await res.json();
      dispatch(receiveSkeleton(newSkeleton));
      return newSkeleton;

  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
       return dispatch(receiveErrors(resBody.errors));
      }
  }
}

export const updateSkeleton = (skeletonId, data) => async dispatch => {
  try {
      const res = await jwtFetch(`/api/skeletons/${skeletonId}`, {
          method: 'PATCH',
          body: JSON.stringify(data)
      });
      const updatedSkeleton = await res.json();
      dispatch(receiveSkeleton(updatedSkeleton));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
      }
  }
}

export const deleteSkeleton = skeletonId => async dispatch => {
  try {
      const res = await jwtFetch(`/api/skeletons/${skeletonId}`, {
          method: 'DELETE'
      });
      // const deletedSkeleton = await res.json();
      dispatch(removeSkeleton(skeletonId));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
      }
  }
}


// REDUCER
const nullErrors = null;

export const skeletonErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
      case RECEIVE_SKELETON_ERRORS:
          return action.errors;
      case RECEIVE_SKELETON:
      case CLEAR_SKELETON_ERRORS:
          return nullErrors;
      default:
          return state;
  }
}



const skeletonsReducer = (state = {}, action) => {
  let newState = { ... state};
  switch (action.type) {
    case RECEIVE_SKELETON:
      return { ...newState, [action.skeleton._id]: action.skeleton };
    case RECEIVE_SKELETONS:
        return { ...newState, ...action.skeletons };
    case RECEIVE_USER_SKELETONS:
        return {...newState, ...action.skeletons};
    case REMOVE_SKELETON:
        delete newState[action.skeleton._id];
        return newState;
    case RECEIVE_SKELETON_COMMENTS:
        let skeletonComments = newState[action.skeletonId]
        skeletonComments.comments = action.comments
        return newState;
    case RECEIVE_SKELETON_LIKES:
        return {...newState, ...action.skeletonId.likes};
    case RECEIVE_COMMENT:
      return {...newState, [action.comment.parent]: {...newState[action.comment.parent], comments: [...newState[action.comment.parent].comments, action.comment]}}
    default:
        return state;
  }
}

export default skeletonsReducer;
