import React from 'react';
import { capitalize } from 'lodash-es';

const LocationDropdown = (props) => {
  const { location, locationId } = props.currentLocation;
  const isLocationData = !!props.locationData;
  const defaultOption = isLocationData && props.locationData.length > 0 ? `**Select A ${capitalize(props.locationType)}**` : `**No available ${capitalize(props.locationType)}**`;
  return (
    <select className="select select__location-picker" onChange={(e) => props.handleLocationPickerOnChange(e, props.locationType)}>
      <option value={locationId}>{location || defaultOption}</option>
      {isLocationData && props.locationData.map((location) => {
        return <option key={location.geonameId} value={location.adminCode1}>{location.name}</option>;
      })}
    </select>
  );
}

export default LocationDropdown;
