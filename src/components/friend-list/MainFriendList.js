import React from 'react';

import { friends } from '../../tests/fixtures/friends-data';

class MainFriendList extends React.Component {
  // REPLACE FRIENDS VARIABLE WITH FRIENDS DATA FROM REDUX/MONGODB
  state = {
    friends
  };
  render () {
    return (
      <table className="friends-list__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Relationship</th>
            <th>Location</th>
            <th>Ranking</th>
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
