import React from 'react';
import InputRange from 'react-input-range';
import { cloneDeep } from 'lodash-es';

import { connect } from 'react-redux';
import { startUpdateFriendListFilters } from '../../actions/filters';

import LocationDropdown from './LocationDropdown';
import LocationPicker from './LocationPicker';
import Dropdown from '../form-elements/Dropdown';

import { selectRelationshipOptions } from '../../selectors/settings';
import { getFiltersByFilterCategory } from '../../selectors/filters';

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
  relationship: []
};

const cloneDeepState = cloneDeep(initialState);

class FriendsFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = initialState;
    this.state.selectedFilters = this.props.selectedFilters ? this.props.selectedFilters : [];
    this.state.rankingSliderValue = this.props.rankingSliderDefaults ? this.props.rankingSliderDefaults : this.state.rankingSliderValue;
    this.state.location = this.props.locationDefaults ? this.props.locationDefaults : this.state.locationDefaults;
  };
  setLocationState = (location) => this.setState({ location });
  handleRankingSliderChange = (rankingSliderValue) => this.setState({ rankingSliderValue });
  handleUpdateFilter = (e) => {
    if (e) {
      e.preventDefault();
    }

    // const {country, region, city} = this.state.location;
    // const paramsArr = [country, region, city].filter((param) => !!param);

    const locationFilter = {
      filterCategory: 'location',
      type: 'location',
      // params: paramsArr
      params: this.state.location
    };

    const rankingFilter = {
      filterCategory: 'ranking',
      type: 'rangeSlider',
      params: this.state.rankingSliderValue
    };

    const relationshipFilter = {
      filterCategory: 'relationship',
      type: 'checkbox',
      params: this.state.relationship
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
  handleCheckboxChange = (filterCategory) => {
    this.setState(filterCategory);
  };
  handleCloseModal = () => {
    if (!!this.props.closeModal) {
      this.props.closeModal();
    }
  };
  render () {
    const { relationshipOptions, relationshipDropdownDefaults } = this.props;
    return (
      <div className={`friends-filter ${this.props.className}`}>
        <h2 className="friends-filter__title">Filter</h2>
        <form className="form friends-filter__form" onSubmit={this.handleUpdateFilter}>
          <fieldset className="friends-filter__form-section friends-filter__relationship-filter" name="relationshipFilter">
            <legend className="friends-filter__form-subtitle">Relationship</legend>
            <Dropdown
              options={relationshipOptions}
              dropdownType={'relationship'}
              defaultSelection={relationshipDropdownDefaults}
              handleCheckboxChange={this.handleCheckboxChange} />
          </fieldset>
          <fieldset className="friends-filter__form-section friends-filter__ranking-filter" name="rankingFilter">
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
          <fieldset className="friends-filter__form-section friends-filter__location-filter" name="locationFilter">
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
  selectedFilters: state.filters.friendsListFilters,
  relationshipOptions: selectRelationshipOptions(state.settings),
  relationshipDropdownDefaults: getFiltersByFilterCategory(state.filters.friendsListFilters, ['relationship']).length > 0 ? getFiltersByFilterCategory(state.filters.friendsListFilters, ['relationship'])[0].params : [],
  rankingSliderDefaults: getFiltersByFilterCategory(state.filters.friendsListFilters, ['ranking']).length > 0 ? getFiltersByFilterCategory(state.filters.friendsListFilters, ['ranking'])[0].params : false,
  locationDefaults: getFiltersByFilterCategory(state.filters.friendsListFilters, ['location']).length > 0 ? getFiltersByFilterCategory(state.filters.friendsListFilters, ['location'])[0].params : false
});

const mapDispatchToProps = (dispatch) => ({
  startUpdateFriendListFilters: (selectedFilters) => dispatch(startUpdateFriendListFilters(selectedFilters))
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsFilter);
