import { combineReducers } from 'redux';
import { reducer as goalReducer } from './goal';
import { reducer as habitReducer } from './habit';
import { reducer as notificationReducer } from './notification';

const rootReducer = combineReducers({
  goal: goalReducer,
  habit: habitReducer,
  notification: notificationReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
