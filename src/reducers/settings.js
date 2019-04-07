export default (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_SETTINGS':
      return action.settings;
    default:
      return state;
  }
};
