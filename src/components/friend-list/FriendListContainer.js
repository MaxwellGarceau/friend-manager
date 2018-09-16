import React from 'react';

import MainFriendList from './MainFriendList';
import FriendsFilter from '../filter-sorting/FriendsFilter';

class FriendListContainer extends React.Component {
  render () {
    return (
      <div className="friends-area__container">
        <MainFriendList />
        <div className="friends-query__container">
          <div className="friends-query__item"></div>
          <FriendsFilter className="friends-query__item" />
        </div>
      </div>
    );
  }
}

export default FriendListContainer;
