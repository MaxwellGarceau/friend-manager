import React from 'react';
import capitalize from 'lodash/capitalize';

import { connect } from 'react-redux';
import { friendsListMasterFilter } from '../../selectors/friend-list-filters';

import FriendListTableCategoryTitle from './FriendListTableCategoryTitle';
import ManuallyAddFriend from './ManuallyAddFriend';
import { sortAlphabetically, sortNumerically, sortByLocation } from '../../utils/sorting-logic/main-friend-list-sorting';

class MainFriendList extends React.Component {
  state = {
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
  // componentDidCatch (error, errorInfo) {
  //   // Catch errors in any components below and re-render with error message
  //   // this.setState({
  //   //   error: error,
  //   //   errorInfo: errorInfo
  //   // })
  //   console.log(error, errorInfo);
  //   // You can also log error messages to an error reporting service here
  // }
  render () {
    return (
      <div className="friends-list">
        <h2 className="friends-list__title">Friends List</h2>
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
              const formattedCity = friend.location.city ? `${friend.location.city}, ` : '';
              const formattedRegion = friend.location.region ? `${friend.location.region} ` : '';
              const formattedCountry = friend.location.country ? `${friend.location.country}` : '';

              let stars = [];
              for (let i = 0; i < friend.ranking; i++) {
                // Caused problems when adding map index to key
                stars.push(<i key={`${friend._id}-${i}`} className="far fa-star"></i>);
              }
              return (
                <tr key={friend._id} className="friends-list__row">
                  <td>{friend.name}</td>
                  <td>{capitalize(friend.relationship)}</td>
                  <td>{`${formattedCity}${formattedRegion}${formattedCountry}`}</td>
                  <td>
                    {stars}
                  </td>
                </tr>
              );
            })}
            <ManuallyAddFriend />
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

export default connect(mapStateToProps)(MainFriendList);
