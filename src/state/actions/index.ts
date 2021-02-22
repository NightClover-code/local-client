//importing types
import { ActionType } from '../action-types';
//action interfaces
interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  };
}
interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: 'code' | 'text';
  };
}
interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}
