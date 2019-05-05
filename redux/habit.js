import { createAction, createReducer } from 'redux-starter-kit';
import moment from 'moment';

const initialState = {
  habits: [],
  achievement: [],
  selectedDay: new Date().toJSON(),
};

export const initialize = createAction('habit/initialize');
export const add = createAction('habit/add');
export const update = createAction('habit/update');
export const remove = createAction('habit/remove');
export const toggleDone = createAction('habit/toggleDone');
export const selectDay = createAction('habit/selectDay');

export const habitReducer = createReducer(initialState, {
  [initialize]: () => initialState,
  [add]: (state, { payload }) => {
    state.habits.push(payload);
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
    const completionDate = moment(state.selectedDay);
    const index = state.achievement.findIndex(
      a => a.id === id && moment(a.date).isSame(completionDate, 'day'),
    );
    if (index >= 0) {
      Object.assign(state, {
        achievement: state.achievement.filter((_, i) => i !== index),
      });
    } else {
      state.achievement.push(Object.assign(payload, { date: completionDate.toJSON() }));
    }
  },
  [selectDay]: (state, { payload }) => {
    Object.assign(state, { selectedDay: payload });
  },
});
