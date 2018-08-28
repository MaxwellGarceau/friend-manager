export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  const allFriendsListFilters = new AllFriendsListFilters();
  let filteredFriendsList = friendsList;
  filterSettings.map((filter) => {
    if (filter.active) {
      const filterKey = filter.filterId;
      filteredFriendsList = allFriendsListFilters[filterKey](filteredFriendsList, filter.params);
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

// const allFriendsListFilters = {
//   relationshipFilter: relationshipFilter,
//   rankingFilter,
//   locationFilter
// };
console.log(AllFriendsListFilters);

// 1) Create list of filter functions and store them in an object
// 2) Provide the function as one key/value pair and the filter id as another key/value pair
// 3) Inside the map function call the correct function per filter based on the filter id key/value pair
