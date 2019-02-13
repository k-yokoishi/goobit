import { combineReducers } from 'redux';
import { goalReducer } from './goal';
import { habitReducer } from './habit';

export default combineReducers({
  goal: goalReducer,
  habit: habitReducer,
});
