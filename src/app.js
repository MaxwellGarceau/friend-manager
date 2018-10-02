import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AppRouterContainer, { history } from './routers/AppRouterContainer';
import configureStore from './store/configureStore';
import { startPopulateFriendList } from './actions/friends';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-input-range/lib/css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import './styles/styles.scss';
import LoadingPage from './components/LoadingPage';

const { store, persistor } = configureStore();

const jsx = (
  <Provider store={store}>
    <PersistGate loading={<LoadingPage />} persistor={persistor}>
      <AppRouterContainer />
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
