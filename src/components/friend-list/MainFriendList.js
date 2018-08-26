import React from 'react';

import { friends } from '../../tests/fixtures/friends-data';
import { determineSortDirection, sortFriendsListAlphabetically } from '../../utils/sorting-logic/main-friend-list-sorting';

class MainFriendList extends React.Component {
  // REPLACE FRIENDS VARIABLE WITH FRIENDS DATA FROM REDUX/MONGODB
  state = {
    friends,
    nameSortDirection: 'ascending',
    relationshipSortDirection: 'ascending',
    locationSortDirection: 'ascending',
    rankingSortDirection: 'ascending'
  };
  handleSortByName = () => {
    const { friends, nameSortDirection } = this.state;
    const sortedFriendsList = sortFriendsListAlphabetically(friends, nameSortDirection, 'name');

    this.setState({ friends: sortedFriendsList }, () => {
      determineSortDirection(this, 'nameSortDirection');
    });
  };
  handleSortByRelationship = () => {
    const { friends, relationshipSortDirection } = this.state;
    const sortedFriendsList = sortFriendsListAlphabetically(friends, relationshipSortDirection, 'relationship');

    this.setState({ friends: sortedFriendsList }, () => {
      determineSortDirection(this, 'relationshipSortDirection');
    });
  };
  handleSortByLocation = () => {

    determineSortDirection(this, 'locationSortDirection');
    console.log('handleSortByLocation');
  };
  handleSortByRanking = () => {

    determineSortDirection(this, 'rankingSortDirection');
    console.log('handleSortByRanking');
  };
  render () {
    return (
      <table className="friends-list__table">
        <thead>
          <tr>
            <th className="friends-list__category-title" onClick={this.handleSortByName}>Name</th>
            <th className="friends-list__category-title" onClick={this.handleSortByRelationship}>Relationship</th>
            <th className="friends-list__category-title" onClick={this.handleSortByLocation}>Location</th>
            <th className="friends-list__category-title" onClick={this.handleSortByRanking}>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {this.state.friends.map((friend) => {
            return (
              <tr key={friend.id} className="friends-list__row">
                <td>{friend.name}</td>
                <td>{friend.relationship}</td>
                <td>{friend.location}</td>
                <td>{friend.ranking}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MainFriendList;
