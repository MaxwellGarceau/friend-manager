import React from 'react';
// import axios from 'axios';

const LocationDropdown = (props) => {
  return (
    <select onChange={props.handleLocationPickerOnChange}>
      {!!props.locationData && props.locationData.map((location) => {
        return <option key={location.geonameId} value={location.adminCodes1.ISO3166_2}>{location.name}</option>;
      })}
    </select>
  );
}

export default LocationDropdown;
