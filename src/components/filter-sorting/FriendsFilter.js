import React from 'react';
import InputRange from 'react-input-range';
import { cloneDeep } from 'lodash-es';

import { connect } from 'react-redux';
import { startUpdateFriendListFilters } from '../../actions/filters';

import LocationDropdown from './LocationDropdown';
import LocationPicker from './LocationPicker';

// Initial State and deep copy
const initialState = {
  selectedFilters: [],
  rankingSliderValue: {
    min: 1,
    max: 5
  },
  location: {
    country: '',
    countryId: 'initial',
    region: '',
    regionId: '',
    city: '',
    cityId: ''
  },
  relationship: {
    friend: false,
    family: false,
    acquaintance: false
  }
};

const cloneDeepState = cloneDeep(initialState);

class FriendsFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = initialState;
    this.state.selectedFilters = this.props.selectedFilters ? this.props.selectedFilters : [];
    console.log('state', this.state);
  };
  setLocationState = (location) => this.setState({ location });
  handleRankingSliderChange = (rankingSliderValue) => this.setState({ rankingSliderValue });
  handleUpdateFilter = (e) => {
    if (e) {
      e.preventDefault();
    }

    const {country, region, city} = this.state.location;
    const paramsArr = [country, region, city].filter((param) => !!param);

    const locationFilter = {
      filterCategory: 'location',
      type: 'dropdown',
      params: paramsArr
    };

    const rankingFilter = {
      filterCategory: 'ranking',
      type: 'rangeSlider',
      params: this.state.rankingSliderValue
    };

    const relationshipFilter = {
      filterCategory: 'relationship',
      type: 'checkbox',
      params: this.state.relationship.filter((param) => !!param)
    }

    const selectedFilters = [relationshipFilter, locationFilter, rankingFilter];
    this.props.startUpdateFriendListFilters(selectedFilters);
    this.handleCloseModal();
  };
  handleResetFilter = () => {
    let cloneDeeper = cloneDeep(cloneDeepState);
    this.setState(cloneDeeper, () => {
      this.handleUpdateFilter();
      this.handleCloseModal();
    });
  };
  handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const checkboxChecked = e.target.checked;
    const filterCategory = e.target.dataset.filterCategory;

    this.setState((prevState) => ({
      [filterCategory]: {
        ...prevState[filterCategory],
        [checkboxName]: checkboxChecked
      }
    }));
  };
  handleCloseModal = () => {
    if (!!this.props.closeModal) {
      this.props.closeModal();
    }
  };
  render () {
    return (
      <div className={`friends-filter ${this.props.className}`}>
        <h2 className="friends-filter__title">Filter</h2>
        <form className="form friends-filter__form" onSubmit={this.handleUpdateFilter}>
          <fieldset className="friends-filter__form-section" name="relationshipFilter">
            <legend className="friends-filter__form-subtitle">Relationship</legend>
            <input
              type="checkbox"
              name="friend"
              checked={this.state.relationship.friend}
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship"
              ref="friendCheckbox" />
            <label> Friend</label>
            <br />
            <input
              type="checkbox"
              name="family"
              checked={this.state.relationship.family}
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship"
              ref="familyCheckbox" />
            <label> Family</label>
            <br />
            <input
              type="checkbox"
              name="acquaintance"
              checked={this.state.relationship.acquaintance}
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship"
              ref="acquaintanceCheckbox" />
            <label> Acquaintance</label>
            <br />
          </fieldset>
          <fieldset className="friends-filter__form-section" name="rankingFilter">
            <legend className="friends-filter__form-subtitle">Ranking</legend>
            <InputRange
              allowSameValues={true}
              maxValue={5}
              minValue={1}
              formatLabel={value => `${value} star`}
              value={this.state.rankingSliderValue}
              onChange={this.handleRankingSliderChange}
            />
            <br />
          </fieldset>
          <fieldset className="friends-filter__form-section" name="locationFilter">
            <legend className="friends-filter__form-subtitle">Location</legend>
            <LocationPicker setLocationState={this.setLocationState} location={this.state.location} />
          </fieldset>
          <div className="friends-filter__button-container">
            <button className="button button--friends-filter">Set Filter</button>
            <button className="button button--friends-filter" type="button" onClick={this.handleResetFilter}>Reset Filter</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedFilters: state.filters.friendsListFilters
});

const mapDispatchToProps = (dispatch) => ({
  startUpdateFriendListFilters: (selectedFilters) => dispatch(startUpdateFriendListFilters(selectedFilters))
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsFilter);
