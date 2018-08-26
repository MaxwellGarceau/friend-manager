import React from 'react';

class FriendsFilter extends React.Component {
  render () {
    return (
      <div>
        <h2>Filter</h2>
        <input type="checkbox" name="friend" value="friend" /> Friend
        <br />
        <input type="checkbox" name="friend" value="friend" /> Family
        <br />
        <input type="checkbox" name="friend" value="friend" /> Acquaintance
        <br />
      </div>
    );
  }
}

export default FriendsFilter;
