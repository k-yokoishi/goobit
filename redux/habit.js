import { createAction, createReducer } from 'redux-starter-kit';
import uuidv4 from 'uuid/v4';

const initialState = {
  habits: [],
};

export const initialize = createAction('habit/initialize');
export const add = createAction('habit/add');

export const habitReducer = createReducer(initialState, {
  [initialize]: () => initialState,
  [add]: (state, action) => {
    const habitWithKey = Object.assign({}, action.payload, { id: uuidv4() });
    state.habits.push(habitWithKey);
  },
});
