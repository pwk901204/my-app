import { createActions, handleActions } from 'redux-actions';

const defaultState = {};

export const { registerInfo } = createActions({
  registerInfo: data => ({ ...data })
});

export const reducer = handleActions(
  {
    registerInfo: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  defaultState
);
