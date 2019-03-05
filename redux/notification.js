import { createAction, createReducer } from 'redux-starter-kit';

const initialState = {
  notifications: [],
};

export const initialize = createAction('notification/initialize');
export const set = createAction('notification/set');
export const remove = createAction('notification/remove');

export const notificationReducer = createReducer(initialState, {
  [initialize]: () => initialize,
  [set]: (state, { payload }) => {
    const { habit, notificationId } = payload;
    const index = state.notifications.findIndex(
      n => n.habitId === habit && n.notificationId === notificationId,
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
