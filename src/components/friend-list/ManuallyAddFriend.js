import React from 'react';
import _ from 'lodash';
import StarRatingComponent from 'react-star-rating-component';

class ManuallyAddFriend extends React.Component {
  state = {
    relationshipOptions: ['friend', 'family', 'acquaintance'],
    rank: 5,
    name: ''
  };
  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rank: nextValue });
  };
  handleName = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };
  render () {
    return (
      <tr>
        <td><input type="text" placeholder="Name" value={this.state.name} onChange={this.handleName} /></td>
        <td>
          <select placeholder="Relationship">
            {this.state.relationshipOptions.map((option, ind) => {
              return <option key={`add-friend-relationship-option-key-${ind}`}>{_.startCase(option)}</option>;
            })}
          </select>
        </td>
        {/* REPLACE WITH LIBRARY OF COUNTRY, REGION, CITIES */}
        <td><input placeholder="Location" /></td>
        <td>
          <StarRatingComponent
            name="manually-add-friend-ranking"
            value={this.state.rank}
            onStarClick={this.onStarClick}
            starCount={5}
            renderStarIcon={() => <i className="far fa-star"></i>}
          /></td>
      </tr>
    );
  }
}

export default ManuallyAddFriend;