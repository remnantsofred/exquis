import jwtFetch from "./jwt";

export const RECEIVE_BONE = "bones/RECEIVE_BONE";
export const RECEIVE_BONES = "bones/RECEIVE_BONES";
export const REMOVE_BONE = "bones/REMOVE_BONE";
export const RECEIVE_BONE_ERRORS = "bones/RECEIVE_BONE_ERRORS";
export const CLEAR_BONE_ERRORS = "bones/CLEAR_BONE_ERRORS";
export const RECEIVE_USER_BONES = "bones/RECEIVE_USER_BONES";


// ACTION CREATORS
const receiveBone = bone => ({
  type: RECEIVE_BONE,
  bone
});

const receiveBones = bones => ({
  type: RECEIVE_BONES,
  bones
});

const removeBone = boneId => ({
  type: REMOVE_BONE,
  boneId
});

const receiveErrors = errors => ({
  type: RECEIVE_BONE_ERRORS,
  errors
});

const clearErrors = () => ({
  type: CLEAR_BONE_ERRORS
});

const receiveUserBones = bones => ({
  type: RECEIVE_USER_BONES,
  bones
});



// export const getSkeletons = state => {
//     const skeletons = Object.values(state.skeletons);
//     return skeletons;
// }

// export const getSkeleton = (state, skeletonId) => state.skeletons[skeletonId];

// export const getSkeleton = skeletonId => store

export const getBones = (store) => { 
  if (store.bones) return Object.values(store.bones);
  return [];
}; 

export const getBone = (boneId) => (store) => {
  if (store.bones && store.bones[boneId]) return store.bones[boneId];
  return null;
};

// THUNK ACTION CREATORS

export const fetchBones = () => async (dispatch) => {
  const res = await fetch('/api/bones');
  if (res.ok) {
    const bones = await res.json();
    dispatch(receiveBones(bones));
    return Promise.resolve();
  }
};

export const fetchUserBones = userId => async dispatch => {
  try {
      const res = await jwtFetch(`/api/bones/user/${userId}`);
      const bones = await res.json();
      dispatch(receiveUserBones(bones));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
      }
  }
}

export const fetchBone = (skeletonId, boneId) => async (dispatch) => {
  const res = await fetch(`/api/bones/skeletons/${skeletonId}/${boneId}`);
  if (res.ok) {
    const bone = await res.json();
    dispatch(receiveBone(bone));
    return Promise.resolve();
  }
}

export const createBone = (skeletonId, data) => async dispatch => {
  // console.log("data", data)
  try {
      const res = await jwtFetch(`/api/bones/skeletons/${skeletonId}`, {
          method: 'POST',
          body: JSON.stringify(data)
      });
      const newBone = await res.json();
      dispatch(receiveBone(newBone));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
       return dispatch(receiveErrors(resBody.errors));
      }
  }
}

export const updateBone = (skeletonId, boneId, data) => async dispatch => {
  try {
      const res = await jwtFetch(`/api/bones/skeletons/${skeletonId}/${boneId}`, {
          method: 'PATCH',
          body: JSON.stringify(data)
      });
      const updatedBone = await res.json();
      dispatch(receiveBone(updatedBone));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
      }
  }
}

export const deleteBone = (skeletonId, boneId) => async dispatch => {
  try {
      const res = await jwtFetch(`/api/bones/skeletons/${skeletonId}/${boneId}`, {
          method: 'DELETE'
      });
      // const deletedBone = await res.json();
      dispatch(removeBone(boneId));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
      }
  }
}


// REDUCER
const nullErrors = null;

export const boneErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
      case RECEIVE_BONE_ERRORS:
          return action.errors;
      case RECEIVE_BONE:
      case CLEAR_BONE_ERRORS:
          return nullErrors;
      default:
          return state;
  }
}


const bonesReducer = (state = {}, action) => {
  let newState = { ... state};
  switch (action.type) {
    case RECEIVE_BONES:
      return {...newState, ...action.bones};
    case RECEIVE_BONE:
      return { ...newState, [action.bone._id]: action.bone };
    case REMOVE_BONE:
      delete newState[action.boneId];
      return newState;
    default:
      return state;
  }
}

export default bonesReducer;