export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FRIEND_LIST_FILTERS':
      return {
        user: action.selectedFilters
      };
    default:
      return state;
  }
};
