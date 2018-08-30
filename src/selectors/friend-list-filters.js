export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  const allFriendsListFilters = new AllFriendsListFilters();
  let filteredFriendsList = friendsList;
  filterSettings.map((filter) => {
    if (filter.active) {
      console.log('filterCategory', filter.filterCategory);
      const filterMethod = filter.type;
      const filterCategory = filter.filterCategory;
      const activeFilters = filter.params;
      filteredFriendsList = allFriendsListFilters[filterMethod](filteredFriendsList, activeFilters, filterCategory);
    }
  });
  console.log('filteredFriendsList', filteredFriendsList);
  return filteredFriendsList;
};

class AllFriendsListFilters {
  checkbox = (friendsList, paramsArr, filterCategory) => {
    return friendsList.filter((friend) => {
      return paramsArr.filter((param) => friend[filterCategory] === param).join();
    });
  };

  rankingFilter = (friendsList) => {
    // Code goes here
  };

  locationFilter = (friendsList) => {
    // Code goes here
  };
}
