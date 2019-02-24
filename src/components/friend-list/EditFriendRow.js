import React from 'react';

import { connect } from 'react-redux';

import { startCase } from 'lodash-es';
import StarRatingComponent from 'react-star-rating-component';
import ModifyFriendIcons from './ModifyFriendIcons';

import LocationPicker from '../filter-sorting/LocationPicker';
import Dropdown from '../form-elements/Dropdown';
import { findFriendById } from '../../selectors/friends';

class EditFriendRow extends React.Component {
  constructor (props) {
    super(props);
    const { friend } = props;

    this.state = {
      ranking: friend ? friend.ranking : 5,
      name: friend ? friend.name : '',
      relationship: friend ? friend.relationship : {
        friend: false,
        family: false,
        acquaintance: true
      },
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
  handleRelationship = (selectedOption) => {
    console.log('selectedOption', selectedOption);
    this.setState((prevState) => {
      // If the option had been selected previously then unselect it now
      const isSelected = !!prevState.relationship[selectedOption] ? false : true;
      return {
        relationship: {
          ...prevState.relationship,
          [selectedOption.value]: isSelected
        }
      }
    });
    // const relationship = e.target.value;
    // this.setState({ relationship });
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

    const friend = findFriendById(this.props.completeFriendsList, _id);

    const editedFriend = {
      ...friend,
      name,
      relationship,
      location,
      ranking,
      _id
    };

    this.props.handleOnSubmit(editedFriend);

    // Resets state after adding a friend (if editng a friend, the component is removed anyways)
    this.setState({
      name: '',
      relationship: {
        friend: false,
        family: false,
        acquaintance: true
      },
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
  handleCheckboxChange = (filterCategory) => {
    this.setState(filterCategory);
  };
  render () {
    const { friend } = this.props;
    const checkboxOptions = [{
      name: 'friend',
      label: 'Friend',
      checked: false,
      filterCategory: 'relationship'
    }, {
      name: 'family',
      label: 'Family',
      checked: false,
      filterCategory: 'relationship'
    }, {
      name: 'acquaintance',
      label: 'Acquaintance',
      checked: false,
      filterCategory: 'relationship'
    }];
    return (
      <React.Fragment>
        <tr className="manually-add-friend">
          <td align="center"><input type="text" className="text-input" placeholder="Name" value={this.state.name} onChange={this.handleName} /></td>
          <td align="center">
            {/*<select value={this.state.relationship} className="select" onChange={this.handleRelationship} placeholder="Relationship">
                  {this.state.relationshipOptions.map((option, ind) => {
                    return <option key={`add-friend-relationship-option-key-${ind}`} value={option}>{startCase(option)}</option>;
                  })}
                </select>*/}
                <Dropdown options={checkboxOptions} handleCheckboxChange={this.handleCheckboxChange}/>
          </td>
          <td align="center">
            <LocationPicker setLocationState={this.setLocationState} location={this.state.location} />
          </td>
          <td align="center">
            <StarRatingComponent
              name="manually-add-friend-ranking"
              value={this.state.ranking}
              onStarClick={this.onStarClick}
              starCount={5}
              renderStarIcon={() => <i className="far fa-star"></i>}
              className="manually-add-friend__dv-star-rating"
            />
            {!!friend && friend.canEditFriend && this.props.canEditFriends && <ModifyFriendIcons friend={this.props.friend} canEditFriendRow={true} onSubmit={this.onSubmit} />}
          </td>
        </tr>
        {!friend && <tr><td><button type="button" className="button button--add-friends" onClick={this.onSubmit}>Add Friend</button></td></tr>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  completeFriendsList: state.friends
});

export default connect(mapStateToProps)(EditFriendRow);
