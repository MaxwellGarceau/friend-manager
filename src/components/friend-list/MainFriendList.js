import React from 'react';

class MainFriendList extends React.Component {
  state = {
    friends: [{
      name: 'Rafael',
      id: 1
    }, {
      name: 'Keenan',
      id: 2
    }, {
      name: 'Kyle',
      id: 3
    }]
  };
  render () {
    return (
      <table className="friends-list__container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Relationship</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {this.state.friends.map((friend) => {
            return (
              <tr key={friend.id} className="friends-list__row">
                <td className="">{friend.name}</td>
                <td className="">{friend.name}</td>
                <td className="">{friend.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MainFriendList;
