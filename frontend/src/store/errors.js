import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { skeletonErrorsReducer } from './skeletons';
import { boneErrorsReducer } from './bones';
import { commentErrorReducer } from './comments';


export default combineReducers({
  session: sessionErrorsReducer,
  skeletons: skeletonErrorsReducer,
  bones: boneErrorsReducer,
  comments: commentErrorReducer
});