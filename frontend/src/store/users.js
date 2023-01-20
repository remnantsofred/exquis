import jwtFetch from "./jwt";

export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const REMOVE_USER = "users/REMOVE_USER";
export const RECEIVE_USER_ERRORS = "users/RECEIVE_USER_ERRORS";
export const CLEAR_USER_ERRORS = "users/CLEAR_USER_ERRORS";


// ACTION CREATORS
const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const removeUser = userId => ({
  type: REMOVE_USER,
  userId
});

const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

const clearErrors = () => ({
  type: CLEAR_USER_ERRORS
});

export const getUsers = (store) => { 
  if (store.users) return Object.values(store.users);
  return [];
}; 

export const getUser = (userId) => (store) => {
  if (store.users && store.users[userId]) return store.users[userId];
  return null;
};

// THUNK ACTION CREATORS


export const fetchUsers = () => async (dispatch) => {
  const res = await fetch('/api/users');
  if (res.ok) {
    const users = await res.json();
    dispatch(receiveUsers(users));
    return Promise.resolve();
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(receiveUser(user));
    return Promise.resolve();
  }
}

export const updateUser = (userId, data) => async dispatch => {
  try {
      const res = await jwtFetch(`/api/users/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify(data)
      });
      const updatedUser = await res.json();
      dispatch(receiveUser(updatedUser));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
      }
  }
}

export const deleteUser = userId => async dispatch => {
  try {
      const res = await jwtFetch(`/api/users/${userId}`, {
          method: 'DELETE'
      });
      const deletedUser = await res.json();
      dispatch(removeUser(deletedUser.id));
  } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
      }
  }
}


// REDUCER
const nullErrors = null;

export const userErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
      case RECEIVE_USER_ERRORS:
          return action.errors;
      case RECEIVE_USER:
      case CLEAR_USER_ERRORS:
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

const usersReducer = (state = { }, action) => {
  let newState = { ... state};
  switch (action.type) {
    case RECEIVE_USER:
      // return action.skeleton
      return { ...newState, [action.user._id]: action.user };
        // return { ...state, new: action.skeleton, new: undefined };
    case RECEIVE_USERS:
        return { ...newState, ...action.users };
    case REMOVE_USER:
        // const newState = { ...state };
        delete newState[action.user._id];
        return newState;
    default:
        return state;
  }
}

export default usersReducer;