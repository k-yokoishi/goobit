import { createSlice, PayloadAction } from 'redux-starter-kit';
import { Notification } from '../types/type';

interface State {
  notifications: Notification[];
}
const initialState: State = {
  notifications: [],
};

const notification = createSlice({
  slice: 'notification',
  initialState,
  reducers: {
    initialize: () => initialState,
    set: (state: State, { payload }: PayloadAction<Notification>) => {
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
    remove: (state: State, { payload }: PayloadAction<string>) => {
      const notifications = state.notifications.filter(n => n.habitId !== payload);
      Object.assign(state, { notifications });
    },
  },
});

export const {
  reducer,
  actions: { initialize, set, remove },
} = notification;
