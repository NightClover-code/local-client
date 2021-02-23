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
        const { direction } = action.payload;
        const index = state.order.findIndex(id => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        //preventing getting outside the array
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }
        //swapping logic
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return;
      case ActionType.INSERT_CELL_BEFORE:
        return;
      case ActionType.UPDATE_CELL:
        //updating state without mutating it (immer)
        const { id, content } = action.payload;
        state.data[id].content = content;
        return;
      default:
        return state;
    }
  }
);
export default cellsReducer;
