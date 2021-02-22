//importing types & immer
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Cell } from '../cell';
import produce from 'immer';
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
const cellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.DELETE_CELL:
        //deleting cell & removing it from order
        delete state.data[action.payload];
        state.order = state.order.filter(id => id !== action.payload);
        return;
      case ActionType.MOVE_CELL:
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        return state;
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        //updating state without mutating it (immer)
        state.data[id].content = content;
        return;
      default:
        return state;
    }
  }
);
export default cellsReducer;
