import { createAction, createReducer } from 'redux-starter-kit';
import moment from 'moment';

const initialState = {
  habits: [],
  achievement: [],
};

export const initialize = createAction('habit/initialize');
export const add = createAction('habit/add');
export const update = createAction('habit/update');
export const remove = createAction('habit/remove');
export const toggleDone = createAction('habit/toggleDone');

export const habitReducer = createReducer(initialState, {
  [initialize]: () => initialState,
  [add]: (state, { payload }) => {
    state.habits.push({ enabled: true, ...payload });
  },
  [update]: (state, { payload }) => {
    const { id } = payload;
    Object.assign(state, { habits: state.habits.map(h => (h.id === id ? payload : h)) });
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
});
