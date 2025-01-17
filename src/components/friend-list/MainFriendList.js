import React from 'react';

import { connect } from 'react-redux';
import { startAddFriend, startEditFriend, startCancelEditFriends } from '../../actions/friends';
import { friendsListMasterFilter } from '../../selectors/friend-list-filters';

import FriendListTableCategoryTitle from './FriendListTableCategoryTitle';
import EditFriendRow from './EditFriendRow';
import FriendRow from './FriendRow';
import { sortAlphabetically, sortNumerically, sortByLocation } from '../../utils/sorting-logic/main-friend-list-sorting';

class MainFriendList extends React.Component {
  state = {
    friends: this.props.friends,
    activeSort: '',
    canEditFriends: false
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
  handleStartAddFriend = (newFriend) => {
    this.props.startAddFriend(newFriend);
  };
  handleStartEditFriend = (editedFriend) => {
    this.props.startEditFriend(editedFriend);
  };
  toggleEditFriends = () => {
    !!this.state.canEditFriends ? this.setState({ canEditFriends: false }, () => this.props.startCancelEditFriends()) : this.setState({ canEditFriends: true });
  };
  componentWillReceiveProps (nextProps) {
    if (nextProps.friends !== this.props.friends) {
      this.setState({ friends: nextProps.friends });
    }
  };
  render () {
    const { canEditFriends } = this.state;
    const toggleEditFriendsButtonText = !!canEditFriends ? 'Cancel' : 'Edit Friends';
    return (
      <div className="friends-list">
        <h2 className="friends-list__title">Friends List</h2>
        <div className="friends-list__edit-friends-container">
          <button className="button button--modify-friends" onClick={this.toggleEditFriends}>{toggleEditFriendsButtonText}</button>
        </div>
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
              if (!!friend.canEditFriend) {
                return <EditFriendRow key={friend._id} friend={friend} canEditFriends={canEditFriends} handleOnSubmit={this.handleStartEditFriend} />;
              } else {
                return <FriendRow key={friend._id} friend={friend} canEditFriends={canEditFriends} />;
              }
            })}
            <EditFriendRow handleOnSubmit={this.handleStartAddFriend} />
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  friendsListFilters: state.filters.friendsListFilters,
  friends: friendsListMasterFilter(state.friends, state.filters.friendsListFilters)
});

const mapDispatchToProps = (dispatch) => ({
  startEditFriend: (editedFriend) => dispatch(startEditFriend(editedFriend)),
  startAddFriend: (newFriend) => dispatch(startAddFriend(newFriend)),
  startCancelEditFriends: () => dispatch(startCancelEditFriends())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFriendList);
