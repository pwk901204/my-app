import { combineReducers } from 'redux';
import userInfo from './userInfo';
import registerInfo from './registerInfo';

const reducersApp = combineReducers({
  userInfo,
  registerInfo
});

export default reducersApp;
