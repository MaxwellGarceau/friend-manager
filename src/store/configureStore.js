import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import filterReducer from '../reducers/filters';
import friendsReducer from '../reducers/friends';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  auth: authReducer,
  filters: filterReducer,
  friends: friendsReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
