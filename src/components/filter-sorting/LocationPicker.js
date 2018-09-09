import React from 'react';
import axios from 'axios';

import LocationDropdown from './LocationDropdown';

class LocationPicker extends React.Component {
  constructor () {
    super();

    // Initial API request to geonames for country data
    axios.get('http://api.geonames.org/countryInfoJSON?username=maxgarceau').then((res) => {
      const allCountries = res.data.geonames;
      this.setState({ allCountries });
    });

    this.state = {
      location: {
        country: '',
        region: '',
        city: ''
      }
    };
  }

  handleLocationPickerOnChange = (e, area) => {
    let areaName = e.target.options[e.target.selectedIndex].text;
    const selection = e.target.value;
    areaName = !selection ? areaName = '' : areaName;

    this.setState((prevState) => ({ location: {
      ...prevState.location,
      [`${area}Id`]: selection,
      [area]: areaName
    } }), () => {
      this.props.setLocationState(this.state.location);
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
          }), () => this.props.setLocationState(this.state.location));
          break;
        case 'region':
          this.handleLocationCity();
          // If region is selected reset city
          this.setState((prevState) => ({
            location: {
              ...prevState.location,
              city: '',
              cityId: ''
            }
          }), () => this.props.setLocationState(this.state.location));
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
    const { location } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}

export default LocationPicker;
