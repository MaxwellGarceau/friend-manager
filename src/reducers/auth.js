// import { loadState } from '../store/local-storage';

// Loads user auth (login) state from localStorage to auth reducer as default state
// const persistedAuthState = loadState().auth;

export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        user: action.user
      };
    case 'LOGIN':
      return {
        user: action.user
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
