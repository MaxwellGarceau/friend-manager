import React from 'react';
import capitalize from 'lodash/capitalize';

import { connect } from 'react-redux';
import { friendsListMasterFilter } from '../../selectors/friend-list-filters';
import StarRatingComponent from 'react-star-rating-component';

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
  enableEditFriends = () => {
    console.log('Enable Edit Friends');
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
      <div className="friends-list">
        <h2 className="friends-list__title">Friends List</h2>
        <div className="friends-list__edit-friends-container">
          <button className="button button--modify-friends" onClick={this.enableEditFriends}>Edit Friends</button>
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
              const formattedCity = friend.location.city ? `${friend.location.city}, ` : '';
              const formattedRegion = friend.location.region ? `${friend.location.region} ` : '';
              const formattedCountry = friend.location.country ? `${friend.location.country}` : '';
              return (
                <tr key={friend._id} className="friends-list__row">
                  <td className="friends-list__name"><input readOnly className="friends-list__input readonly" value={friend.name} /></td>
                  <td className="friends-list__relationship"><input readOnly className="friends-list__input readonly" value={capitalize(friend.relationship)} /></td>
                  <td className="friends-list__location"><input readOnly className="friends-list__input readonly" value={`${formattedCity}${formattedRegion}${formattedCountry}`} /></td>
                  <td className="friends-list__ranking">
                    <StarRatingComponent
                      name="output-friend-ranking"
                      value={friend.ranking}
                      starCount={5}
                      renderStarIcon={() => <i className="far fa-star"></i>}
                      className="manually-add-friend__dv-star-rating"
                    />
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
