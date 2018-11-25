import { firstBy } from 'thenby';
import { addOrderCurrentProperty } from './display-order';
// Sorting functions for friends list

export const sortAlphabetically = (friendsListArr, sortDirection, sortParam) => {
  friendsListArr.sort(
    firstBy((a, b) => a[sortParam].localeCompare(b[sortParam]), sortDirection)
  );
  return addOrderCurrentProperty(friendsListArr);
};

export const sortNumerically = (friendsListArr, sortDirection, sortParam) => {
  friendsListArr.sort(
    firstBy((a, b) => a[sortParam] - b[sortParam], sortDirection)
  );
  return addOrderCurrentProperty(friendsListArr);
};

export const sortByLocation = (friendsListArr, sortDirection) => {
  friendsListArr.sort(
    firstBy((a, b) => a.location.country.localeCompare(b.location.country), sortDirection)
      .thenBy((a, b) => a.location.region.localeCompare(b.location.region), sortDirection)
      .thenBy((a, b) => a.location.city.localeCompare(b.location.city), sortDirection)
  );
  return addOrderCurrentProperty(friendsListArr);
};
