let defaultState = {
};

const registerInfo = (state = defaultState, action) => {
  switch (action.type) {
    case 'REGISTER_INFO':
      return {
      	...state,
        ...action
      };
    default:
      return state;
  }
};

export default registerInfo;
