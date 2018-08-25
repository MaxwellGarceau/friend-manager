import axios from 'axios';
import moment from 'moment';

import { jwtToken } from '../utils/custom-validation/user-credentials';

export const signUp = (user) => ({
  type: 'SIGN_UP',
  user
});

export const startSignUp = (userData) => {
  return async (dispatch, getState) => {
    const {
      email = '',
      password = ''
    } = userData;
    const signUpDate = moment().toDate();
    const user = { email, password, signUpDate };

    try {
      const response = await axios.post('/api/users', user);

      return dispatch(signUp({
        _id: response.data._id,
        email
      }));
    } catch (e) {
      return e;
    }
  };
};

export const login = (user) => ({
  type: 'LOGIN',
  user
});

export const startLogin = (userData) => {
  return async (dispatch, getState) => {
    const {
      email = '',
      password = ''
    } = userData;
    const user = { email, password };

    try {
      const response = await axios.post('/api/users/login', user);

      return dispatch(login({
        _id: response.data._id,
        signUpDate: response.data.signUpDate,
        email
      }));
    } catch (e) {
      return e;
    }
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        'x-auth': jwtToken
      }
    };
    try {
      await axios.delete('/api/users/me/token', config);
      return dispatch(logout());
    } catch (e) {
      return e;
    }
  };
};
