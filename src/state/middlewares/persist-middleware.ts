//importing types
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
import { RootState } from '../reducers';
//save middleware
export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => (next: (action: Action) => void) => (action: Action) => {
  //dispatching actions
  next(action);

  if (
    [
      ActionType.INSERT_CELL_AFTER,
      ActionType.MOVE_CELL,
      ActionType.UPDATE_CELL,
      ActionType.DELETE_CELL,
    ].includes(action.type)
  ) {
    //saving cells
    saveCells()(dispatch, getState);
  }
};
