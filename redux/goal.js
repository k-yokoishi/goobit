import { createAction, createReducer } from 'redux-starter-kit';

const initialState = {
  text: '',
};

export const initialize = createAction('goal/initialize');
export const update = createAction('goal/update');

export const goalReducer = createReducer(initialState, {
  [initialize]: () => initialState,
  [update]: (state, action) => {
    Object.assign(state, { text: action.payload.text });
  },
});
