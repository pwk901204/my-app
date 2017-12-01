export default HOCConfig => {
  //需要token
  if (HOCConfig.needToken && !localStorage['reduxPersist:userInfo']) {
    global.customizeHistory.push('/Login');
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
