import jwtFetch from "./jwt";

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



// export const getSkeletons = state => {
//     const skeletons = Object.values(state.skeletons);
//     return skeletons;
// }

// export const getSkeleton = (state, skeletonId) => state.skeletons[skeletonId];

// export const getSkeleton = skeletonId => store

export const getSkeletons = (store) => { 
  if (store.skeletons) return Object.values(store.skeletons);
  return [];
}; 

export const getSkeleton = (skeletonId) => (store) => {
  if (store.skeletons && store.skeletons[skeletonId]) return store.skeletons[skeletonId];
  return null;
};

// THUNK ACTION CREATORS

// export const fetchSkeletons = () => async dispatch => {
//   try {
//       const res = await jwtFetch('/api/skeletons');
//       const skeletons = await res.json();
//       dispatch(receiveSkeletons(skeletons));
//   } catch (err) {
//       const resBody = await err.json();
//       if (resBody.statusCode === 400) {
//       dispatch(receiveErrors(resBody.errors));
//       }
//   }
// }

export const fetchSkeletons = () => async (dispatch) => {
  const res = await fetch('/api/skeletons');
  if (res.ok) {
    const skeletons = await res.json();
    dispatch(receiveSkeletons(skeletons));
    return Promise.resolve();
  }
};


// export const fetchSkeletons = () => async (dispatch) => {
//   let res = await fetch("/api/skeletons");
//   if (res.ok) {
//       let skeletons = await res.json();
//       dispatch(receiveSkeletons(skeletons))
//   }
// }

export const fetchSkeleton = (skeletonId) => async (dispatch) => {
  const res = await fetch(`/api/skeletons/${skeletonId}`);
  if (res.ok) {
    const skeleton = await res.json();
    dispatch(receiveSkeleton(skeleton));
    return Promise.resolve();
  }
}

// export const fetchSkeleton = skeletonId => async dispatch => {
//   try {
//       const res = await jwtFetch(`/api/skeletons/${skeletonId}`);
//       const skeleton = await res.json();
//       dispatch(receiveSkeleton(skeleton));
//   } catch (err) {
//       const resBody = await err.json();
//       if (resBody.statusCode === 400) {
//       dispatch(receiveErrors(resBody.errors));
//       }
//   }
// }

export const createSkeleton = data => async dispatch => {
  console.log("data", data)
  try {
      const res = await jwtFetch('/api/skeletons/', {
          method: 'POST',
          body: JSON.stringify(data)
      });
      console.log("res", res)
      const newSkeleton = await res.json();
      dispatch(receiveSkeleton(newSkeleton));
  } catch (err) {
      const resBody = await err.json();
      console.log("resBody", resBody)
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
      const deletedSkeleton = await res.json();
      dispatch(removeSkeleton(deletedSkeleton.id));
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


// const skeletonsReducer = (state = {}, action) => {
//   let newState = { ... state};
//   switch (action.type) {
//     case RECEIVE_SKELETONS:
//       return {...newState, ...action.skeletons};
//     case RECEIVE_SKELETON:
//       return { ...newState, [action.skeleton._id]: action.skeleton };
//     case REMOVE_SKELETON:
//       delete newState[action.skeletonId];
//       return newState;
//     default:
//       return state;
//   }
// }

const skeletonsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  let newState = { ... state};
  switch (action.type) {
    case RECEIVE_SKELETON:
      // return action.skeleton
      return { ...newState, [action.skeleton._id]: action.skeleton };
        // return { ...state, new: action.skeleton, new: undefined };
    case RECEIVE_SKELETONS:
        return { ...newState, all: action.skeletons };
    case RECEIVE_USER_SKELETONS:
        return {...newState, user: action.skeletons, new: undefined };
    case REMOVE_SKELETON:
        // const newState = { ...state };
        delete newState[action.skeleton._id];
        return newState;
    default:
        return state;
  }
}

export default skeletonsReducer;