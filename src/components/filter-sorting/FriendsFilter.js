import React from 'react';
import InputRange from 'react-input-range';
import axios from 'axios';

import { connect } from 'react-redux';
import { startUpdateFriendListFilters } from '../../actions/filters';

import LocationDropdown from './LocationDropdown';

class FriendsFilter extends React.Component {
  constructor (props) {
    super(props);

    // Initial API request to geonames for country data
    axios.get('http://api.geonames.org/countryInfoJSON?username=maxgarceau').then((res) => {
      const allCountries = res.data.geonames;
      this.setState({ allCountries });
    });

    this.state = {
      selectedFilters: [],
      rankingSliderValue: {
        min: 1,
        max: 5
      },
      location: {
        country: undefined,
        region: undefined,
        city: undefined
      }
    };
  };
  handleRankingSliderChange = (rankingSliderValue) => this.setState({ rankingSliderValue });
  handleUpdateFilter = (e) => {
    e.preventDefault();
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
        stateCopy.selectedFilters[prevFilterIndex].params = stateCopy.selectedFilters[prevFilterIndex].params.filter((param) => param !== name)
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
  handleLocationPickerOnChange = (e, area) => {
    let areaName = e.target.options[e.target.selectedIndex].text;
    const selection = e.target.value;
    areaName = !selection ? areaName = '' : areaName;

    this.setState((prevState) => ({ location: {
      ...prevState.location,
      [`${area}Id`]: selection,
      [area]: areaName
    } }), () => {
      switch (area) {
        case 'city':
          break;
        case 'country':
          this.handleLocationRegion();
          // If country is selected reset region and city
          this.setState((prevState) => ({
            location: {
              country: prevState.location.country,
              countryId: prevState.location.countryId
            }
          }));
          break;
        case 'region':
          this.handleLocationCity();
          // If region is selected reset city
          this.setState((prevState) => ({
            location: {
              ...prevState.location,
              city: undefined,
              cityId: undefined
            }
          }));
          break;
        default:
          break;
      }
    });
  };
  handleLocationRegion = async () => {
    const geonameId = this.state.location.countryId;
    const response = await axios.get(`http://api.geonames.org/childrenJSON?username=maxgarceau&geonameId=${geonameId}`);
    const allRegions = response.data.geonames;
    this.setState({ allRegions });
  };
  handleLocationCity = async () => {
    const adminCode1 = this.state.location.regionId;
    const response = await axios.get(`http://api.geonames.org/searchJSON?username=maxgarceau&featureClass=P&cities=cities15000&adminCode1=${adminCode1}`);
    const allCities = response.data.geonames;
    this.setState({ allCities });
  };
  render () {
    const location = this.state.location;
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
              // onChange={this.handleCheckboxChangeTest}
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
            <select onChange={(e) => this.handleLocationPickerOnChange(e, 'country')}>
              <option value="">*Select A Country*</option>
              {!!this.state.allCountries && this.state.allCountries.map((country) => {
                return <option key={country.geonameId} value={country.geonameId} data-name={country.countryName}>{country.countryName}</option>;
              })}
            </select>
            {!!location.countryId &&
              <LocationDropdown
                handleLocationPickerOnChange={this.handleLocationPickerOnChange}
                locationType="region"
                locationData={this.state.allRegions} />}
            {!!location.regionId &&
              <LocationDropdown
                handleLocationPickerOnChange={this.handleLocationPickerOnChange}
                locationType="city"
                locationData={this.state.allCities} />}
            <br />
          </fieldset>
          <button>Set Filter</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startUpdateFriendListFilters: (selectedFilters) => dispatch(startUpdateFriendListFilters(selectedFilters))
});

export default connect(undefined, mapDispatchToProps)(FriendsFilter);
