import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
//reducers
const reducers = combineReducers({
  cells: cellsReducer,
});
export default reducers;
//ensuring typescript knows the type of our state
export type RootState = ReturnType<typeof reducers>;
