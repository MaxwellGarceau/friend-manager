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
      console.log('res', res);
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
        country: '',
        region: '',
        city: ''
      }
    };
  };
  generateInputField = (type, name, onChange, filterCategory) => {
    return (
      <input
        type={type}
        name={name}
        onChange={onChange}
        data-filter-category={filterCategory} />
    );
  };
  handleRankingSliderChange = (rankingSliderValue) => this.setState({ rankingSliderValue });
  handleUpdateFilter = (e) => {
    e.preventDefault();
    const selectedFilters = this.state.selectedFilters;
    this.props.startUpdateFriendListFilters(selectedFilters);
  };
//   handleUpdateFilterTest = (e) => {
//     e.preventDefault();
//     let checkboxFilters = [];
//     Object.keys(this.state).map((key) => {
//       if (key.isChecked) {
//         if (checkboxFilters.hasOwnProperty(key.filterCategory)) {
// 
//         }
//       }
//     });
//   };
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
  // handleCheckboxChangeTest = (e) => {
  //   console.log(e.target.checked);
  //   this.setState({
  //     [e.target.name]: {
  //       filterCategory: e.target.dataset.filterCategory,
  //       type: e.target.type,
  //       param: e.target.name,
  //       isChecked: e.target.checked
  //     }
  //   });
  // };
  // handleLocationPicker = async () => {
  //   const allCountries = await axios.post('http://api.geonames.org/countryInfoJSON?username=maxgarceau');
  //   return (
  //     <select>
  //       {allCountries.geonames.map((country) => {
  //         return <option value={country.geonameId}>{country.countryName}</option>;
  //       })}
  //     </select>
  //   );
  // };
  handleLocationPickerOnChange = (e, area) => {
    const selection = e.target.value;
    this.setState({ location: {
      [area]: selection
    } }, () => {
      area === 'country' ? this.handleLocationRegion() : this.handleLocationCity();
    });
  };
  handleLocationRegion = async () => {
    const geonameId = this.state.location.country;
    const response = await axios.get(`http://api.geonames.org/childrenJSON?username=maxgarceau&geonameId=${geonameId}`);
    const allRegions = response.data.geonames;
    this.setState({ allRegions });
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
              {!!this.state.allCountries && this.state.allCountries.map((country) => {
                return <option key={country.geonameId} value={country.geonameId}>{country.countryName}</option>;
              })}
            </select>
            {!!location.country &&
              <LocationDropdown
                handleLocationPickerOnChange={this.handleLocationPickerOnChange}
                locationData={this.state.allRegions} />}
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
