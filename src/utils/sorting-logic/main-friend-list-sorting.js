import { firstBy } from 'thenby';
// Sorting functions for friends list

export const determineSortDirection = (that, sortField) => {
  that.setState((prevState) => {
    const newSortDirection = prevState[sortField] === 'ascending' ? 'descending' : 'ascending';
    return {
      [sortField]: newSortDirection
    };
  });
};

export const sortAlphabetically = (friendsListArr, sortDirection, sortParam) => {
  if (sortDirection === 'ascending') {
    return friendsListArr.sort((a, b) => a[sortParam].localeCompare(b[sortParam]));
  } else {
    return friendsListArr.sort((a, b) => b[sortParam].localeCompare(a[sortParam]));
  }
}

export const sortByLocation = (friendsListArr, sortDirection) => {
  const sortDirectionNum = sortDirection === 'ascending' ? 1 : -1;
  return friendsListArr.sort(
    firstBy((a, b) => a.location.country.localeCompare(b.location.country), sortDirectionNum)
      .thenBy((a, b) => a.location.region.localeCompare(b.location.region), sortDirectionNum)
      .thenBy((a, b) => a.location.city.localeCompare(b.location.city), sortDirectionNum)
  );
};
