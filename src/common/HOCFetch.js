import { browserHistory } from 'react-router';
export default HOCConfig => {
  //需要token
  if (HOCConfig.needToken && !localStorage['reduxPersist:userInfo']) {
    browserHistory.push('/Login');
    return function() {
      return new Promise((resolve, reject) => {
        reject('结束');
      });
    };
  } else {
    return function() {
      return fetch(...arguments);
    };
  }
};
