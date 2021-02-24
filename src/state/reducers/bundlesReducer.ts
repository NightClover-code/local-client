//importing types & immer
import { Action } from '../actions';
import { ActionType } from '../action-types';
import produce from 'immer';
import { Bundle } from '../bundle';
//bundle state interface
interface BundleState {
  [key: string]: Bundle;
}
//reducer
const bundleReducer = produce(
  (state: BundleState = {}, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        return state;
      case ActionType.BUNDLE_COMPLETE:
        return state;
      default:
        return state;
    }
  }
);
export default bundleReducer;
