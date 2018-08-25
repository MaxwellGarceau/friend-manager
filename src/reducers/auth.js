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
