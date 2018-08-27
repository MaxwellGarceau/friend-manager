import React from 'react';

import FriendListTableCategoryTitle from './FriendListTableCategoryTitle';
import { friends } from '../../tests/fixtures/friends-data';
import { determineSortDirection, sortAlphabetically, sortNumerically, sortByLocation } from '../../utils/sorting-logic/main-friend-list-sorting';

class MainFriendList extends React.Component {
  state = {
    // REPLACE FRIENDS VARIABLE WITH FRIENDS DATA FROM REDUX/MONGODB
    friends,
    nameSortDirection: 1,
    relationshipSortDirection: 1,
    locationSortDirection: 1,
    rankingSortDirection: 1
  };
  handleSortByName = (sortDirection) => {
    // const { friends, nameSortDirection } = this.state;
    // const sortedFriendsList = sortAlphabetically(friends, nameSortDirection, 'name');
    const sortedFriendsList = sortAlphabetically(this.state.friends, sortDirection, 'name');

    // this.setState({ friends: sortedFriendsList }, () => {
    //   determineSortDirection(this, 'nameSortDirection');
    // });
    this.setState({ friends: sortedFriendsList });
  };
  handleSortByRelationship = () => {
    const { friends, relationshipSortDirection } = this.state;
    const sortedFriendsList = sortAlphabetically(friends, relationshipSortDirection, 'relationship');

    this.setState({ friends: sortedFriendsList }, () => {
      determineSortDirection(this, 'relationshipSortDirection');
    });
  };
  handleSortByLocation = () => {
    const { friends, locationSortDirection } = this.state;
    const sortedFriendsList = sortByLocation(friends, locationSortDirection);

    this.setState({ friends: sortedFriendsList }, () => {
      determineSortDirection(this, 'locationSortDirection');
    });
  };
  handleSortByRanking = () => {
    const { friends, rankingSortDirection } = this.state;
    const sortedFriendsList = sortNumerically(friends, rankingSortDirection, 'ranking');

    this.setState({ friends: sortedFriendsList }, () => {
      determineSortDirection(this, 'rankingSortDirection');
    });
  };
  render () {
    // const nameSortIconDirection = this.state.nameSortDirection === 1 ? 'fa-rotate-90' : 'fa-rotate-270';
    return (
      <table className="friends-list__table">
        <thead>
          <tr>
            {/* <th className="friends-list__category-title" onClick={this.handleSortByName}> */}
            {/*   Name <i className={`fas fa-caret-right friends-list__sort-icon`}></i> */}
            {/* </th> */}
            <FriendListTableCategoryTitle title={'Name'} handleSort={this.handleSortByName}/>
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
                <td>{`${friend.location.city}, ${friend.location.region} ${friend.location.country}`}</td>
                <td>{`${friend.ranking} star (REPLACE WITH STAR PIC LATER)`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MainFriendList;
