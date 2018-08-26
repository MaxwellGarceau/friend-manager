// Sorting functions for friends list

export const determineSortDirection = (that, sortField) => {
  that.setState((prevState) => {
    const newSortDirection = prevState[sortField] === 'ascending' ? 'descending' : 'ascending';
    return {
      [sortField]: newSortDirection
    };
  });
};

export const sortFriendsListAlphabetically = (friendsListArr, sortDirection, sortParam) => {
  if (sortDirection === 'ascending') {
    return friendsListArr.sort((a, b) => a[sortParam].localeCompare(b[sortParam]));
  } else {
    return friendsListArr.sort((a, b) => b[sortParam].localeCompare(a[sortParam]));
  }
}
