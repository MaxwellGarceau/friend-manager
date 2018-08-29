export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  const allFriendsListFilters = new AllFriendsListFilters();
  let filteredFriendsList = friendsList;
  filterSettings.map((filter) => {
    if (filter.active) {
      const filterMethod = filter.filterId;
      const activeFilters = filter.params;
      filteredFriendsList = allFriendsListFilters[filterMethod](filteredFriendsList, activeFilters);
    }
  });
  console.log('filteredFriendsList', filteredFriendsList);
  return filteredFriendsList;
};

class AllFriendsListFilters {
  relationshipFilter = (friendsList, paramsArr) => {
    return friendsList.filter((friend) => {
      return paramsArr.filter((param) => friend.relationship === param).join();
    });
  };

  rankingFilter = (friendsList) => {
    // Code goes here
  };

  locationFilter = (friendsList) => {
    // Code goes here
  };
}
