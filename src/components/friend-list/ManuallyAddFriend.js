import React from 'react';
// import _ from 'lodash';
import { startCase } from 'lodash-es';
import StarRatingComponent from 'react-star-rating-component';

import LocationPicker from '../filter-sorting/LocationPicker';

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
  setLocationState = (location) => this.setState({ location });
  render () {
    return (
      <tr className="manually-add-friend">
        <td align="center"><input type="text" className="text-input" placeholder="Name" value={this.state.name} onChange={this.handleName} /></td>
        <td align="center">
          <select className="select" placeholder="Relationship">
            {this.state.relationshipOptions.map((option, ind) => {
              return <option key={`add-friend-relationship-option-key-${ind}`}>{startCase(option)}</option>;
            })}
          </select>
        </td>
        <td align="center">
          <LocationPicker setLocationState={this.setLocationState} />
        </td>
        <td align="center">
          <StarRatingComponent
            name="manually-add-friend-ranking"
            value={this.state.rank}
            onStarClick={this.onStarClick}
            starCount={5}
            renderStarIcon={() => <i className="far fa-star"></i>}
            className="manually-add-friend__dv-star-rating"
          /></td>
      </tr>
    );
  }
}

export default ManuallyAddFriend;
