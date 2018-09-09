import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { saveState } from './store/local-storage';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-input-range/lib/css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/js/all.min.js';
import './styles/styles.scss';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

store.subscribe(() => {
  saveState(store.getState());
});

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

renderApp();
