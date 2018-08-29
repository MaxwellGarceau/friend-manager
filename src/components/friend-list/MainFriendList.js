import React from 'react';

import { connect } from 'react-redux';
import { friendsListMasterFilter } from '../../selectors/friend-list-filters';

import FriendListTableCategoryTitle from './FriendListTableCategoryTitle';
import ManuallyAddFriend from './ManuallyAddFriend';
import { sortAlphabetically, sortNumerically, sortByLocation } from '../../utils/sorting-logic/main-friend-list-sorting';

class MainFriendList extends React.Component {
  state = {
    // REPLACE FRIENDS VARIABLE WITH FRIENDS DATA FROM REDUX/MONGODB
    // PASS FILTER SETTINGS FROM REDUX AS 2ND ARGUMENT
    // friends: friendsListMasterFilter(this.props.friends, this.props.friendsListFilters),
    friends: this.props.friends,
    activeSort: ''
  };
  handleSortByName = (sortDirection) => {
    const friends = sortAlphabetically(this.state.friends, sortDirection, 'name');
    this.setState({ friends });
  };
  handleSortByRelationship = (sortDirection) => {
    const friends = sortAlphabetically(this.state.friends, sortDirection, 'relationship');
    this.setState({ friends });
  };
  handleSortByLocation = (sortDirection) => {
    const friends = sortByLocation(this.state.friends, sortDirection);
    this.setState({ friends });
  };
  handleSortByRanking = (sortDirection) => {
    const friends = sortNumerically(this.state.friends, sortDirection, 'ranking');
    this.setState({ friends });
  };
  setActiveSort = (activeSort) => {
    this.setState({ activeSort });
  };
  componentWillReceiveProps (nextProps) {
    if (nextProps.friends !== this.props.friends) {
      this.setState({ friends: nextProps.friends });
    }
  };
  render () {
    return (
      <table className="friends-list__table">
        <thead>
          <tr>
            <FriendListTableCategoryTitle
              title={'Name'}
              handleSort={this.handleSortByName}
              activeSort={this.state.activeSort}
              setActiveSort={this.setActiveSort} />
            <FriendListTableCategoryTitle
              title={'Relationship'}
              handleSort={this.handleSortByRelationship}
              activeSort={this.state.activeSort}
              setActiveSort={this.setActiveSort} />
            <FriendListTableCategoryTitle
              title={'Location'}
              handleSort={this.handleSortByLocation}
              activeSort={this.state.activeSort}
              setActiveSort={this.setActiveSort} />
            <FriendListTableCategoryTitle
              title={'Ranking'}
              handleSort={this.handleSortByRanking}
              activeSort={this.state.activeSort}
              setActiveSort={this.setActiveSort} />
          </tr>
        </thead>
        <tbody>
          {this.state.friends.map((friend) => {
            let stars = [];
            for (let i = 0; i < friend.ranking; i++) {
              // Caused problems when adding map index to key
              stars.push(<i key={`star-ranking-key-${i}`} className="far fa-star"></i>);
            }
            return (
              <tr key={friend.id} className="friends-list__row">
                <td>{friend.name}</td>
                <td>{friend.relationship}</td>
                <td>{`${friend.location.city}, ${friend.location.region} ${friend.location.country}`}</td>
                <td>
                  {stars.map((star) => star)}
                </td>
              </tr>
            );
          })}
          <ManuallyAddFriend />
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  friendsListFilters: state.filters.friendsListFilters,
  friends: friendsListMasterFilter(state.friends, state.filters.friendsListFilters)
});

export default connect(mapStateToProps)(MainFriendList);
