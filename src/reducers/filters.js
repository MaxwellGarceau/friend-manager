export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_FRIEND_LIST_FILTERS':
      return {
        friendsListFilters: action.selectedFilters
      };
    default:
      return state;
  }
};
