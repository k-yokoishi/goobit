import { combineReducers } from 'redux';
import { goalReducer } from './goal';
import { habitReducer } from './habit';
import { notificationReducer } from './notification';

export default combineReducers({
  goal: goalReducer,
  habit: habitReducer,
  notification: notificationReducer,
});
