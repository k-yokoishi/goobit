import { createSlice } from 'redux-starter-kit';
import moment from 'moment';

export const initialState = {
  habits: [],
  achievement: [],
  selectedDay: new Date().toJSON(),
};

const habit = createSlice({
  slice: 'habit',
  initialState,
  reducers: {
    initialize: () => initialState,
    add: (state, { payload }) => {
      state.habits.push(payload);
    },
    update: (state, { payload }) => {
      const { id } = payload;
      Object.assign(state, { habits: state.habits.map(h => (h.id === id ? payload : h)) });
    },
    remove: (state, { payload }) => {
      const habits = state.habits.filter(h => h.id !== payload);
      const achievement = state.achievement.filter(a => a.id !== payload);
      Object.assign(state, { habits, achievement });
    },
    toggleDone: (state, { payload }) => {
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
    selectDay: (state, { payload }) => {
      Object.assign(state, { selectedDay: payload });
    },
  },
});

export const {
  reducer,
  actions: {
    initialize, add, update, remove, toggleDone, selectDay,
  },
} = habit;
