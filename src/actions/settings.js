import axios from 'axios';

import { getJwtToken } from '../utils/custom-validation/user-credentials';

export const populateSettings = (settings) => ({
  type: 'POPULATE_SETTINGS',
  settings
});

export const startPopulateSettings = () => {
  return async (dispatch, getState) => {
    try {
      const jwtToken = getJwtToken();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth': jwtToken
        }
      };
      const response = await axios.get('/api/settings', config);
      console.log('response', response);
      const settings = response.data;

      return dispatch(populateSettings(settings));
    } catch (e) {
      console.log('Error!', e);
    }
  }
};
