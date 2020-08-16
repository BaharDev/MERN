import { authReducer } from './auth';
import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { profileReducer } from './profile';


export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
});
