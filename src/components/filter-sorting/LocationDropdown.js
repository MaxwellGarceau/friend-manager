import React from 'react';
// import axios from 'axios';

const LocationDropdown = (props) => {
  return (
    <select onChange={(e) => props.handleLocationPickerOnChange(e, props.locationType)}>
      {!!props.locationData && props.locationData.map((location) => {
        return <option key={location.geonameId} value={location.adminCode1}>{location.name}</option>;
      })}
    </select>
  );
}

export default LocationDropdown;
