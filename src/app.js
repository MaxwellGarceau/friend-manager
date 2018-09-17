import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startPopulateFriendList } from './actions/friends';
import { saveState } from './store/local-storage';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-input-range/lib/css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import './styles/styles.scss';
import LoadingPage from './components/LoadingPage';

const { store, persistor } = configureStore();

// Saves state from localStorage to redux
store.subscribe(() => {
  saveState(store.getState());
});

const jsx = (
  <Provider store={store}>
    <PersistGate loading={<LoadingPage />} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
let hasRendered = false;
const renderApp = async () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

renderApp();
