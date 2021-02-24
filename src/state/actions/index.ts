//importing types
import { ActionType } from '../action-types';
import { CellTypes } from '../cell';
//action type
export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleCompleteAction
  | BundleStartAction;
//direction type
export type Direction = 'up' | 'down';
//action interfaces
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}
export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}
export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    id: string;
  };
}
export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}
