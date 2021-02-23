import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ActionType } from './action-types';
import reducers from './reducers';
//getting typescript to work with devtools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
//redux dev tools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//redux store
export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: { id: null, type: 'code' },
});
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: { id: null, type: 'text' },
});
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: { id: null, type: 'code' },
});
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: { id: null, type: 'text' },
});
