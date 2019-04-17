export default (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_FRIEND_SETTINGS':
      return [...state, action.settings];
    case 'POPULATE_FILTER_SETTINGS':
      return [...state, action.filterSettings];
    default:
      return state;
  }
};
