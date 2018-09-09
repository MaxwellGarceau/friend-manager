import React from 'react';
import InputRange from 'react-input-range';
import axios from 'axios';
import _ from 'lodash';

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
    region: '',
    city: ''
  }
};

const cloneDeepState = _.cloneDeep(initialState);

class FriendsFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = initialState;
  };
  setLocationState = (location) => {
    this.setState({ location });
  };
  handleRankingSliderChange = (rankingSliderValue) => this.setState({ rankingSliderValue });
  handleUpdateFilter = (e) => {
    if (e) {
      e.preventDefault();
    }

    const {country, region, city} = this.state.location;
    const paramsArr = [country, region, city].filter((param) => !!param);
    console.log('paramsArr in component', paramsArr);

    const locationFilter = {
      filterCategory: 'location',
      type: 'dropdown',
      params: paramsArr
    };

    const selectedFilters = [...this.state.selectedFilters, locationFilter];
    this.props.startUpdateFriendListFilters(selectedFilters);
  };
  handleResetFilter = () => {
    this.setState(cloneDeepState, () => {
      this.handleUpdateFilter();
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
  render () {
    return (
      <div>
        <h2>Filter</h2>
        <form onSubmit={this.handleUpdateFilter}>
          <fieldset name="relationshipFilter">
            <legend>Relationship</legend>
            <input
              type="checkbox"
              name="friend"
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship" /> Friend
            <br />
            <input
              type="checkbox"
              name="family"
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship" /> Family
            <br />
            <input
              type="checkbox"
              name="acquaintance"
              onChange={this.handleCheckboxChange}
              data-filter-category="relationship" /> Acquaintance
            <br />
          </fieldset>
          <fieldset name="rankingFilter">
            <legend>Ranking</legend>
            <InputRange
              maxValue={5}
              minValue={1}
              formatLabel={value => `${value} star`}
              value={this.state.rankingSliderValue}
              onChange={this.handleRankingSliderChange}
            />
            <br />
          </fieldset>
          <fieldset name="locationFilter">
            <legend>Location</legend>
            <LocationPicker setLocationState={this.setLocationState} />
            <br />
          </fieldset>
          <button>Set Filter</button>
          <button type="button" onClick={this.handleResetFilter}>Reset Filter</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startUpdateFriendListFilters: (selectedFilters) => dispatch(startUpdateFriendListFilters(selectedFilters))
});

export default connect(undefined, mapDispatchToProps)(FriendsFilter);
