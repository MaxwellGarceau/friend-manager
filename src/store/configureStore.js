import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import { omit } from 'lodash/omit';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import filterReducer from '../reducers/filters';
import friendsReducer from '../reducers/friends';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let resetCanEditFriend = createTransform(
  (inboundState, key) => {
    if (key !== 'friends') return inboundState
    else {
      const filteredInboundState = inboundState.map((friend) => ({
        ...friend,
        canEditFriend: false
      }));
      return filteredInboundState;
    }
  }
);

const appReducer = combineReducers({
  auth: authReducer,
  filters: filterReducer,
  friends: friendsReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`);
    });
    state = undefined;
  }

  return appReducer(state, action);
};

const rootPersistConfig = {
  key: 'root',
  storage,
  transforms: [resetCanEditFriend]
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
