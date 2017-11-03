import { createActions, handleActions } from 'redux-actions';

const defaultState = {};

export const { userInfo } = createActions({
  userInfo: data => ({ ...data })
});

export const reducer = handleActions(
  {
    userInfo: (state, action) => ({
      ...state,
      ...action.payload,
      token: encodeURIComponent(action.payload.token)
    })
  },
  defaultState
);
