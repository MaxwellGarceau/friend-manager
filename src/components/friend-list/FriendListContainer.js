import React from 'react';

import MainFriendList from './MainFriendList';
import FriendsFilter from '../filter-sorting/FriendsFilter';

class FriendListContainer extends React.Component {
  render () {
    return (
      <div className="friends-area__container">
        <MainFriendList />
        <FriendsFilter />
      </div>
    );
  }
}

export default FriendListContainer;
