let defaultState = {

};

const userInfo = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_INFO':
      return {
        ...action
      };
    default:
      return state;
  }
};

export default userInfo;
