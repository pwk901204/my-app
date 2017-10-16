import { combineReducers } from 'redux';
import { reducer as userInfo } from 'reduxs/userInfo';
import { reducer as registerInfo } from 'reduxs/registerInfo';

const reducersApp = combineReducers({
  userInfo,
  registerInfo
});

export default reducersApp;
