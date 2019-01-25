// import _ from 'lodash';
import { isEmpty } from 'lodash-es';

export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  const allFriendsListFilters = new AllFriendsListFilters();

  // Making a copy of the state
  let filteredFriendsList = friendsList;

  // User Filters for Querying Friends List
  filterSettings.map((filter) => {
    if (!isEmpty(filter.params)) {
      const filterMethod = filter.type;
      const filterCategory = filter.filterCategory;
      const activeFilters = filter.params;
      filteredFriendsList = allFriendsListFilters[filterMethod](filteredFriendsList, activeFilters, filterCategory);
    }
  });
  return filteredFriendsList;
};

// User Filters for Querying Friends List
class AllFriendsListFilters {
  checkbox = (friendsList, paramsArr, filterCategory) => {
    return friendsList.map((friend) => {
      paramsArr.map((param) => {
        if (friend[filterCategory] === param) {
          friend.isVisible = true;
        } else {
          friend.isVisible = false;
        }
      });
      return friend;
    });
  };

  rangeSlider = (friendsList, params, filterCategory) => {
    return friendsList.map((friend) => {
      const { ranking } = friend;
      const { min, max } = params;
      if (ranking >= min && ranking <= max) {
        friend.isVisible = true;
      } else {
        friend.isVisible = false;
      }
      return friend;
    });
  };

  dropdown = (friendsList, paramsArr, filterCategory) => {
    return friendsList.filter((friend) => {
      const friendListLocation = friend.location;
      return paramsArr.filter((param) => {
        console.log('params', param);
        for (const location in friendListLocation) {
          console.log('iterate through friend.location', friendListLocation[location]);
          if (friendListLocation[location] === param) {
            friend.isVisible = true;
          } else {
            friend.isVisible = false;
            break;
          }
        }
      });
    });
  };
}

// // Filter friendslist by _creator
// export const filterFriendsByCreator = (friendsList, creatorId) => {
//   console.log('insideFilter Friendslist', friendsList);
//   console.log('insideFilter creatorId', creatorId);
//   return friendsList.filter((friend) => friend._creator === creatorId);
// }
