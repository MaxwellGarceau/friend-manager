// import _ from 'lodash';
import { isEmpty } from 'lodash-es';

export const friendsListMasterFilter = (friendsList, filterSettings = []) => {
  const allFriendsListFilters = new AllFriendsListFilters();
  let filteredFriendsList = friendsList;
  filterSettings.map((filter) => {
    // Possibly refactor to filter.params.length > 0 for conditonal statement (wouldn't need "active" property)
    if (!isEmpty(filter.params)) {
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
        console.log('params', param);
        for (const location in friendListLocation) {
          console.log('iterate through friend.location', friendListLocation[location]);
          if (friendListLocation[location] === param) {
            return param;
          }
        }
      }).length === paramsArr.length;
    });
  };
}
