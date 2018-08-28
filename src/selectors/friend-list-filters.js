export const friendsListMasterFilter = (friendsList, filterSettings) => {
  let filteredFriendsList = friendsList;
  switch(filterSettings.active) {
    case 'RELATIONSHIP':
      console.log('Relationship filter is active');
    case 'RANKING':
      console.log('Ranking filter is active');
    case 'LOCATION':
      console.log('Location filter is active');
    default:
      return filteredFriendsList;
  }
};
