import { combineReducers } from 'redux';
import { goalReducer } from './goal';

export default combineReducers({
  goal: goalReducer,
});
