import { combineReducers } from 'redux';
import { reducer as goalReducer } from './goal';
import { reducer as habitReducer } from './habit';
import { reducer as notificationReducer } from './notification';

export default combineReducers({
  goal: goalReducer,
  habit: habitReducer,
  notification: notificationReducer,
});
