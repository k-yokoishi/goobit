import { createSlice } from 'redux-starter-kit';

const initialState = {
  notifications: [],
};

const notification = createSlice({
  slice: 'notification',
  initialState,
  reducers: {
    initialize: () => initialState,
    set: (state, { payload }) => {
      const { habitId, notifId } = payload;
      const index = state.notifications.findIndex(
        n => n.habitId === habitId && n.notifId === notifId,
      );
      if (index >= 0) {
        state.notifications.splice(index, 1, payload);
      } else {
        state.notifications.push(payload);
      }
    },
    remove: (state, { payload }) => {
      const notifications = state.notifications.filter(n => n.habitId !== payload);
      Object.assign(state, { notifications });
    },
  },
});

export const {
  reducer,
  actions: { initialize, set, remove },
} = notification;
