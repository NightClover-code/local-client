//importing types
import { ActionType } from '../action-types';
import { CellTypes } from '../cell';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
  Action,
} from '../actions';
import { Dispatch } from 'redux';
//importing bundler
import bundle from '../../bundler';
//update cell
export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
//move cell
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
//insert cell before
export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};
//delete cell
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};
//start bundling
export const createBundle = (id: string, rawCode: string) => async (
  dispatch: Dispatch<Action>
) => {
  //start bundling
  dispatch({
    type: ActionType.BUNDLE_START,
    payload: {
      id,
    },
  });
  //getting bundle result
  const result = await bundle(rawCode);
  //completed bundling
  dispatch({
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      bundle: result,
      id,
    },
  });
};
