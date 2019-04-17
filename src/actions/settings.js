import axios from 'axios';

import { getJwtToken } from '../utils/custom-validation/user-credentials';

const getRequestConfig = () => {
  const jwtToken = getJwtToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      'x-auth': jwtToken
    }
  };
}

export const populateFriendSettings = (settings) => ({
  type: 'POPULATE_FRIEND_SETTINGS',
  settings
});

export const startPopulateFriendSettings = () => {
  const config = getRequestConfig();
  return async (dispatch, getState) => {
    try {
      const settings = await axios.get('/api/settings', config);

      return dispatch(populateFriendSettings(settings.data));
    } catch (e) {
      console.log('Error!', e);
    }
  }
}

export const populateFilterSettings = (filterSettings) => ({
  type: 'POPULATE_FILTER_SETTINGS',
  filterSettings
});

export const startPopulateFilterSettings = () => {
  const config = getRequestConfig();
  return async (dispatch, getState) => {
    try {
      const settings = await axios.get('/api/settings/filters', config);

      return dispatch(populateFilterSettings(settings.data));
    } catch (e) {
      console.log('Error!', e);
    }
  }
}
