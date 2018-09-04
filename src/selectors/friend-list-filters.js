export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  const allFriendsListFilters = new AllFriendsListFilters();
  let filteredFriendsList = friendsList;
  filterSettings.map((filter) => {
    // Possibly refactor to filter.params.length > 0 for conditonal statement (wouldn't need "active" property)
    // if (filter.active) {
    if (filter.params.length > 0) {
      const filterMethod = filter.type;
      const filterCategory = filter.filterCategory;
      const activeFilters = filter.params;
      filteredFriendsList = allFriendsListFilters[filterMethod](filteredFriendsList, activeFilters, filterCategory);
    }
  });
  return filteredFriendsList;
};

class AllFriendsListFilters {
  checkbox = (friendsList, paramsArr, filterCategory) => {
    return friendsList.filter((friend) => {
      return paramsArr.filter((param) => friend[filterCategory] === param).join();
    });
  };

  // MAKE SURE THAT RANKING SLIDER IS SENDING THE TYPE OF rangeSlider
  rangeSlider = (friendsList) => {
    // Code goes here
  };

  // MAKE SURE THAT LOCATION SELECTOR IS SENDING THE TYPE dropdown
  dropdown = (friendsList) => {
    // Code goes here
  };
}
