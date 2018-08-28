export const updateFriendListFilters = (selectedFilters) => ({
  type: 'UPDATE_FRIEND_LIST_FILTERS',
  selectedFilters
});

// Filter works by using name of filter as key. Inside key the values of what the filter contains
// are set as booleans or data as needed
export const startUpdateFriendListFilters = (selectedFilters = []) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateFriendListFilters(selectedFilters));
    } catch (e) {
      console.log('Error!', e);
    }
  };
};
