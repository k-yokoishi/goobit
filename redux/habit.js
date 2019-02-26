import { createAction, createReducer } from 'redux-starter-kit';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

const initialState = {
  habits: [],
  achievement: [],
  editable: false,
};

export const initialize = createAction('habit/initialize');
export const add = createAction('habit/add');
export const remove = createAction('habit/remove');
export const toggleDone = createAction('habit/toggleDone');
export const toggleEditable = createAction('habit/toggleEditable');

export const habitReducer = createReducer(initialState, {
  [initialize]: () => initialState,
  [add]: (state, { payload }) => {
    const habitWithKey = Object.assign({}, payload, { id: uuidv4() });
    state.habits.push(habitWithKey);
  },
  [remove]: (state, { payload }) => {
    const habits = state.habits.filter(h => h.id !== payload);
    const achievement = state.achievement.filter(a => a.id !== payload);
    Object.assign(state, { habits, achievement });
  },
  [toggleDone]: (state, { payload }) => {
    const { id } = payload;
    const today = moment();
    const index = state.achievement.findIndex(
      a => a.id === id && moment(a.date).isSame(today, 'day'),
    );
    if (index >= 0) {
      Object.assign(state, {
        achievement: state.achievement.filter((_, i) => i !== index),
      });
    } else {
      state.achievement.push(Object.assign(payload, { date: today.toJSON() }));
    }
  },
  [toggleEditable]: (state) => {
    Object.assign(state, { editable: !state.editable });
  },
});
