import React from 'react';

import { startCase } from 'lodash-es';
import StarRatingComponent from 'react-star-rating-component';
import ModifyFriendIcons from './ModifyFriendIcons';

import LocationPicker from '../filter-sorting/LocationPicker';

class EditFriendRow extends React.Component {
  constructor (props) {
    super(props);
    const { friend } = props;

    this.state = {
      relationshipOptions: ['friend', 'family', 'acquaintance'],
      ranking: friend ? friend.ranking : 5,
      name: friend ? friend.name : '',
      relationship: friend ? friend.relationship : 'friend',
      location: friend ? friend.location : {
        country: '',
        region: '',
        city: ''
      }
    };
  }

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
  onSubmit = (_id = undefined) => {
    let { name, relationship, location, ranking } = this.state;
    location = {
      city: '',
      cityId: '',
      region: '',
      regionId: '',
      country: '',
      countryId: '',
      ...location
    };
    const friend = {
      name,
      relationship,
      location,
      ranking,
      _id
    };

    this.props.handleOnSubmit(friend);

    this.setState({
      name: '',
      relationship: 'friend',
      location: {
        country: '',
        countryId: 'initial',
        region: '',
        regionId: '',
        city: '',
        cityId: ''
      },
      ranking: 5
    });
  };
  render () {
    const { friend } = this.props;
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
            <LocationPicker setLocationState={this.setLocationState} location={this.state.location} />
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
            {!!friend && friend.canEditFriend && this.props.canEditFriends && <ModifyFriendIcons friend={this.props.friend} canEditFriendRow={true} onSubmit={this.onSubmit} />}
          </td>
        </tr>
        {!friend && <tr><td><button type="button" onClick={this.onSubmit}>Add Friend</button></td></tr>}
      </React.Fragment>
    );
  }
}

export default EditFriendRow;
