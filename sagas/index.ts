import { Notifications } from 'expo';
import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import moment from 'moment';
import { add, update, remove as removeHabit } from '../redux/habit';
import { set, remove as removeNotification } from '../redux/notification';
import { AppState } from '../redux/reducer';
import { IDHabit, Notification } from '../types/type';

export function* scheduleNotification({ payload }: { payload: IDHabit }) {
  const {
    habit, id, remindAt, repetition,
  } = payload;
  if (!remindAt) return;

  // TODO: fix this warning due to using "repeat" option
  const effects = moment
    .weekdays()
    .map((_, idx) => moment(remindAt).add(idx, 'day'))
    .filter(date => repetition[date.weekday()])
    .map(remindDate => ({
      [remindDate.toJSON()]: call(
        Notifications.scheduleLocalNotificationAsync,
        { title: 'リマインド', body: habit },
        { time: remindDate.toDate(), repeat: 'week' },
      ),
    }))
    .reduce((p, n) => Object.assign(p, n), {});

  const dateAndNotifId: { string: string } = yield all(effects);
  const setHabit = ([jsonDate, notifId]: [string, string]) => {
    put(set({ habitId: id, notifId, notifyAt: jsonDate }));
  };
  yield all(Object.entries(dateAndNotifId).map(setHabit));
}

export function* cancelScheduledNotification({ payload }: { payload: string }) {
  const getNotifications = (state: AppState) => state.notification.notifications;
  const notifications: Notification[] = yield select(getNotifications);
  yield put(removeNotification(payload));
  yield all(
    notifications
      .filter(n => n.habitId === payload)
      .map(n => call(Notifications.cancelScheduledNotificationAsync, n.notifId)),
  );
}

export function* rescheduleNotification({ payload }: PayloadAction<IDHabit>) {
  const { id } = payload;
  yield cancelScheduledNotification({ payload: id });
  yield scheduleNotification({ payload });
}

export function* watchAddHabit() {
  yield takeEvery(add, scheduleNotification);
}

export function* watchUpdateHabit() {
  yield takeEvery(update, rescheduleNotification);
}

export function* watchRemoveHabit() {
  yield takeEvery(removeHabit, cancelScheduledNotification);
}

export default function* rootSaga() {
  yield all([watchAddHabit(), watchUpdateHabit(), watchRemoveHabit()]);
}
