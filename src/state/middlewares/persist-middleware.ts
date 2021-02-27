//importing types
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
//save middleware
export const persistMiddleware = ({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
}) => (next: (action: Action) => void) => (action: Action) => {
  //dispatching actions
  next(action);
};
