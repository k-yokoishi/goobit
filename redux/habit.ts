import { createSlice, PayloadAction } from 'redux-starter-kit';
import moment from 'moment';

import { IDHabit } from '../types/type';

interface Achievement {
  id: string;
  habit: string;
  amount: number | null;
  unit: string;
  date: string;
}

interface State {
  habits: IDHabit[];
  achievement: Achievement[];
  selectedDay: string;
}

export const initialState: State = {
  habits: [],
  achievement: [],
  selectedDay: new Date().toJSON(),
};

const habit = createSlice({
  slice: 'habit',
  initialState,
  reducers: {
    initialize: () => initialState,
    add: (state: State, { payload }: PayloadAction<IDHabit>) => {
      state.habits.push(payload);
    },
    update: (state: State, { payload }: PayloadAction<IDHabit>) => {
      const { id } = payload;
      Object.assign(state, {
        habits: state.habits.map(h => (h.id === id ? payload : h)),
      });
    },
    remove: (state: State, { payload }: PayloadAction<string>) => {
      const habits = state.habits.filter(h => h.id !== payload);
      const achievement = state.achievement.filter(a => a.id !== payload);
      Object.assign(state, { habits, achievement });
    },
    toggleDone: (state: State, { payload }: PayloadAction<Achievement>) => {
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
        state.achievement.push({ date: completionDate.toJSON(), ...payload });
      }
    },
    selectDay: (state: State, { payload }: PayloadAction<string>) => {
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
