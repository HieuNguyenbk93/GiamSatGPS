import {applyMiddleware, combineReducers, createStore} from 'redux';
import authenReducer from './reducers/authenReducer';
import thunk from 'redux-thunk';
import requestReducer from './reducers/requestReducer';

const rootReducers = combineReducers({
  authenReducer: authenReducer,
  requestReducer: requestReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
