export const RECEIVE_SKELETONS = "skeletons/RECEIVE_SKELETONS";
export const RECEIVE_SKELETON = "skeletons/RECEIVE_SKELETON";
export const REMOVE_SKELETON = "skeletons/REMOVE_SKELETON";

export const receiveSkeletons = (skeletons) => ({
  type: RECEIVE_SKELETONS,
  skeletons,
});

export const receiveSkeleton = (skeleton) => ({
  type: RECEIVE_SKELETON,
  skeleton,
});

export const removeSkeleton = (skeletonId) => ({
  type: REMOVE_SKELETON,
  skeletonId,
});

export const getSkeletons = (store) => { 
  if (store.skeletons) return Object.values(store.skeletons);
  return [];
}; 

export const getSkeleton = (skeletonId) => (store) => {
  if (store.skeletons && store.skeletons[skeletonId]) return store.skeletons[skeletonId];
  return null;
};

// THUNK ACTION CREATORS
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

export const createSkeleton = (skeletonData) => async (dispatch) => {
  const res = await fetch('/api/skeletons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(skeletonData),
  });
  if (res.ok) {
    const newSkeleton = await res.json();
    dispatch(receiveSkeleton(newSkeleton));
  }
}

export const updateSkeleton = (skeleton) => async (dispatch) => {
  const res = await fetch(`/api/skeletons/${skeleton.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(skeleton),
  });
  if (res.ok) {
    const updatedSkeleton = await res.json();
    dispatch(receiveSkeleton(updatedSkeleton));
  }
}

export const deleteSkeleton = (skeletonId) => async (dispatch) => {
  const res = await fetch(`/api/skeletons/${skeletonId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(removeSkeleton(skeletonId));
  }
}

const skeletonsReducer = (state = {}, action) => {
  let newState = { ... state};
  switch (action.type) {
    case RECEIVE_SKELETONS:
      return {...newState, ...action.skeletons};
    case RECEIVE_SKELETON:
      return { ...newState, [action.skeleton.id]: action.skeleton };
    case REMOVE_SKELETON:
      delete newState[action.skeletonId];
      return newState;
    default:
      return state;
  }
}

export default skeletonsReducer;