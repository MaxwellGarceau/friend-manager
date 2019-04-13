// import _ from 'lodash';
import { isEmpty, pickBy, identity } from 'lodash-es';
import { arrayContainsArray } from './filters';

export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  const allFriendsListFilters = new AllFriendsListFilters();

  // Making a copy of the state
  let filteredFriendsList = friendsList;

  // User Filters for Querying Friends List
  filterSettings.map((filter) => {
    if (!isEmpty(filter.params)) {
      const filterMethod = filter.type;
      const filterCategory = filter.filterCategory;
      const filterParams = filter.params;
      filteredFriendsList = allFriendsListFilters[filterMethod](filteredFriendsList, filterParams, filterCategory);
    }
  });
  return filteredFriendsList;
};

// User Filters for Querying Friends List
class AllFriendsListFilters {
  checkbox = (friendsList, params, filterCategory) => {
    const filterParamsArr = params.map(({ name }) => name);

    return friendsList.filter((friend) => {
      // If friend contains ANY of the filter parameters: same as the "||" operand...
      const friendParamsArr = friend[filterCategory].map(({ name }) => name);
      return filterParamsArr.some((filterParam) => friendParamsArr.includes(filterParam));
    });
  };

  rangeSlider = (friendsList, params, filterCategory) => {
    return friendsList.filter((friend) => {
      const { ranking } = friend;
      const { min, max } = params;
      if (ranking >= min && ranking <= max) {
        return true;
      }
    })
  };

  dropdown = (friendsList, paramsArr, filterCategory) => {
    return friendsList.filter((friend) => {
      const friendListLocation = friend.location;
      return paramsArr.filter((param) => {
        // console.log('params', param);
        for (const location in friendListLocation) {
          // console.log('iterate through friend.location', friendListLocation[location]);
          if (friendListLocation[location] === param) {
            return param;
          }
        }
      }).length === paramsArr.length;
    });
  };

  location = (friendsList, params, filterCategory) => {
    return friendsList.filter((friend) => {
      // Validation/formatting:
      // pickBy() removes empty object properties
      // values() converts object property values into an array
      const friendListLocationsArr = Object.values(pickBy(friend.location, identity));
      const filterLocationsArr = Object.values(pickBy(params, identity));

      // console.log('arrayContainsArray', pickBy(friend.location, identity));
      return arrayContainsArray(filterLocationsArr, friendListLocationsArr);
    });
  };
}
