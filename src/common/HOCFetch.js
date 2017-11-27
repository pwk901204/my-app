import { browserHistory } from 'react-router';
export default HOCConfig => {
  //需要token
  HOCConfig.needToken &&
    !localStorage['reduxPersist:userInfo'] &&
    browserHistory.push('/Login');
  return function() {
    return fetch(...arguments);
  };
};
