import { createAction, createReducer } from 'redux-starter-kit';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

const initialState = {
  habits: [],
  achievement: {},
};

export const initialize = createAction('habit/initialize');
export const add = createAction('habit/add');
export const toggleDone = createAction('habit/toggleDone');

export const habitReducer = createReducer(initialState, {
  [initialize]: () => initialState,
  [add]: (state, { payload }) => {
    const habitWithKey = Object.assign({}, payload, { id: uuidv4() });
    state.habits.push(habitWithKey);
  },
  [toggleDone]: (state, { payload }) => {
    const { id } = payload;
    const date = moment().format('YYYY-MM-DD');
    if (!state.achievement[date]) {
      Object.assign(state.achievement, { [date]: {} });
    }

    if (id in state.achievement[date]) {
      // eslint-disable-next-line no-param-reassign
      delete state.achievement[date][id];
    } else {
      Object.assign(state.achievement[date], { [id]: payload });
    }
  },
});
