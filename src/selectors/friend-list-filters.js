export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  let filteredFriendsList = friendsList;
  filterSettings.map((filter) => {
    if (filter.active) {
      filteredFriendsList = allFriendsListFilters[filter.filterId](filteredFriendsList, filter.params);
    }
  });
  console.log(filteredFriendsList);
  return filteredFriendsList;
};

const allFriendsListFilters = () => {
  return {
    relationshipFilter,
    rankingFilter,
    locationFilter
  };
};

const relationshipFilter = (friendsList, paramsArr) => {
  return friendsList.filter((friend) => {
    return paramsArr.filter((param) => friend.relationship === param);
  });
};

const rankingFilter = (friendsList) => {
  // Code goes here
};

const locationFilter = (friendsList) => {
  // Code goes here
};

// 1) Create list of filter functions and store them in an object
// 2) Provide the function as one key/value pair and the filter id as another key/value pair
// 3) Inside the map function call the correct function per filter based on the filter id key/value pair
