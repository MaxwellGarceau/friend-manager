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
  }
};

const cloneDeepState = cloneDeep(initialState);

class FriendsFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = initialState;
    this.state.selectedFilters = this.props.selectedFilters ? this.props.selectedFilters : [];
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

    const selectedFilters = [...this.state.selectedFilters, locationFilter, rankingFilter];
    this.props.startUpdateFriendListFilters(selectedFilters);
    this.handleCloseModal();
  };
  handleResetFilter = () => {
    // Iterates through refs and unchecks inputs with checkbox type
    for (const key in this.refs) {
      if (this.refs[key].type === 'checkbox') {
        this.refs[key].checked = false;
      }
    }

    let cloneDeeper = cloneDeep(cloneDeepState);
    this.setState(cloneDeeper, () => {
      this.handleUpdateFilter();
      this.handleCloseModal();
    });
  };
  handleCheckboxChange = (e) => {
    const input = e.target;
    const type = input.type;
    const filterCategory = input.dataset.filterCategory;
    const name = input.name;
    const selectedFilters = this.state.selectedFilters;
    let prevFilter = false;
    // If there are previous filters...
    if (selectedFilters.length > 0) {
      // Return filter that input field belongs to
      prevFilter = selectedFilters.filter((filter) => {
        return filter.filterCategory === filterCategory;
      })[0];
    }
    // Location of filter in selected filters array
    const prevFilterIndex = selectedFilters.indexOf(prevFilter);
    const prevParams = prevFilter ? prevFilter.params : [];

    // Remove params and filters
    if (!input.checked) {
      this.setState((prevState) => {
        // Deep copy without mutating state
        let stateCopy = Object.assign({}, prevState);
        stateCopy.selectedFilters = stateCopy.selectedFilters.slice();
        stateCopy.selectedFilters[prevFilterIndex] = Object.assign({}, stateCopy.selectedFilters[prevFilterIndex]);
        stateCopy.selectedFilters[prevFilterIndex].params = stateCopy.selectedFilters[prevFilterIndex].params.filter((param) => param !== name);
        // Set state
        return stateCopy;
      }, () => {
        const selectedFilters = this.state.selectedFilters;
        if (!selectedFilters[prevFilterIndex].params.length > 0) {
          this.setState({
            selectedFilters: selectedFilters.filter((filter) => filter.filterCategory !== filterCategory)
          });
        }
      });
      return;
    }

    // Add params and filters
    this.setState((prevState) => {
      selectedFilters.splice(prevFilterIndex, 1);
      return selectedFilters.push({
        filterCategory,
        type,
        params: [...prevParams, name]
      });
    });
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
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship"
              ref="friendCheckbox" /> Friend
            <br />
            <input
              type="checkbox"
              name="family"
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship"
              ref="familyCheckbox" /> Family
            <br />
            <input
              type="checkbox"
              name="acquaintance"
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship"
              ref="acquaintanceCheckbox" /> Acquaintance
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
