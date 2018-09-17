import React from 'react';

import { connect } from 'react-redux';
import { startAddFriend, startEditFriend } from '../../actions/friends';
import { friendsListMasterFilter } from '../../selectors/friend-list-filters';

import FriendListTableCategoryTitle from './FriendListTableCategoryTitle';
import ManuallyAddFriend from './ManuallyAddFriend';
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
  }
  toggleEditFriends = () => {
    !!this.state.canEditFriends ? this.setState({ canEditFriends: false }) : this.setState({ canEditFriends: true });
  };
  handleStartEditFriend = () => {
    console.log('handle Edit Friends');
    this.props.startEditFriend();
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
          {/* {!!canEditFriends && <button className="button button--modify-friends" onClick={this.handleEditFriends}>Save Friends</button>} */}
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
              if (this.state.editingFriends) {
                return <ManuallyAddFriend friend={friend} handleOnSubmit={this.handleStartEditFriend} />;
              } else {
                return <FriendRow friend={friend} canEditFriends={canEditFriends} />;
              }
            })}
            <ManuallyAddFriend handleOnSubmit={this.handleStartAddFriend} />
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
  startEditFriend: (friend) => dispatch(startEditFriend(friend)),
  startAddFriend: (newFriend) => dispatch(startAddFriend(newFriend))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFriendList);
