import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
//reducers
const reducers = combineReducers({
  cells: cellsReducer,
});
//ensuring typescript knows the type of our state
export default reducers;
