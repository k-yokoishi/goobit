import { createAction, createReducer } from 'redux-starter-kit';

const initialState = {
  notifications: [],
};

export const initialize = createAction('notification/initialize');
export const set = createAction('notification/set');
export const remove = createAction('notification/remove');

export const notificationReducer = createReducer(initialState, {
  [initialize]: () => initialState,
  [set]: (state, { payload }) => {
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
  [remove]: (state, { payload }) => {
    const notifications = state.notifications.filter(n => n.habitId !== payload);
    Object.assign(state, { notifications });
  },
});
