import { firstBy } from 'thenby';
// Sorting functions for friends list

export const sortAlphabetically = (friendsListArr, sortDirection, sortParam) => {
  return friendsListArr.sort(
    firstBy((a, b) => a[sortParam].localeCompare(b[sortParam]), sortDirection)
  );
};

export const sortNumerically = (friendsListArr, sortDirection, sortParam) => {
  return friendsListArr.sort(
    firstBy((a, b) => a[sortParam] - b[sortParam], sortDirection)
  );
};

export const sortByLocation = (friendsListArr, sortDirection) => {
  return friendsListArr.sort(
    firstBy((a, b) => a.location.country.localeCompare(b.location.country), sortDirection)
      .thenBy((a, b) => a.location.region.localeCompare(b.location.region), sortDirection)
      .thenBy((a, b) => a.location.city.localeCompare(b.location.city), sortDirection)
  );
};
