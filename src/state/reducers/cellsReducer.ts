//importing types
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Cell } from '../cell';
//cell state
interface CellsState {
  data: {
    [key: string]: Cell;
  };
  error: string | null;
  loading: boolean;
  order: string[];
}
//initialState
const initialState: CellsState = {
  data: {},
  loading: false,
  order: [],
  error: null,
};
//reducer
const cellsReducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.UPDATE_CELL:
      return state;
    default:
      return state;
  }
};
export default cellsReducer;
