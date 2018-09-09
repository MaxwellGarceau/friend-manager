import React from 'react';
// import _ from 'lodash';
import { capitalize } from 'lodash-es';

const LocationDropdown = (props) => {
  const isLocationData = !!props.locationData;
  const defaultOption = isLocationData && props.locationData.length > 0 ? `**Select A ${capitalize(props.locationType)}**` : `**No available ${capitalize(props.locationType)}**`;
  return (
    <select className="select select__location-picker" onChange={(e) => props.handleLocationPickerOnChange(e, props.locationType)}>
      <option value="">{defaultOption}</option>
      {isLocationData && props.locationData.map((location) => {
        return <option key={location.geonameId} value={location.adminCode1}>{location.name}</option>;
      })}
    </select>
  );
}

export default LocationDropdown;
