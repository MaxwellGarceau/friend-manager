import React from 'react';

import { connect } from 'react-redux';
import { startAddFriend } from '../../actions/friends';

import { startCase } from 'lodash-es';
import StarRatingComponent from 'react-star-rating-component';

import LocationPicker from '../filter-sorting/LocationPicker';

class ManuallyAddFriend extends React.Component {
  state = {
    relationshipOptions: ['friend', 'family', 'acquaintance'],
    ranking: 5,
    name: '',
    relationship: 'friend'
  };
  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ ranking: nextValue });
  };
  handleName = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };
  handleRelationship = (e) => {
    const relationship = e.target.value;
    this.setState({ relationship });
  };
  setLocationState = (location) => this.setState({ location });
  onSubmit = () => {
    let { name, relationship, location, ranking } = this.state;
    location = {
      city: '',
      region: '',
      country: '',
      ...location
    };
    const newFriend = {
      name,
      relationship,
      location,
      ranking
    };

    this.props.startAddFriend(newFriend);
  };
  render () {
    return (
      <React.Fragment>
        <tr className="manually-add-friend">
          <td align="center"><input type="text" className="text-input" placeholder="Name" value={this.state.name} onChange={this.handleName} /></td>
          <td align="center">
            <select value={this.state.relationship} className="select" onChange={this.handleRelationship} placeholder="Relationship">
              {this.state.relationshipOptions.map((option, ind) => {
                return <option key={`add-friend-relationship-option-key-${ind}`} value={option}>{startCase(option)}</option>;
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
            />
          </td>
        </tr>
        <tr><td><button type="button" onClick={this.onSubmit}>Add Friend</button></td></tr>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddFriend: (newFriend) => dispatch(startAddFriend(newFriend))
});

export default connect(undefined, mapDispatchToProps)(ManuallyAddFriend);
