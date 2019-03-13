import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post:postReducer,
  profile:profileReducer,
  search:searchReducer,
  msg:messageReducer
});
