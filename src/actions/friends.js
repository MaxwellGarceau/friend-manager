import axios from 'axios';
import moment from 'moment';

import { jwtToken } from '../utils/custom-validation/user-credentials';

export const addFriend = (newFriend) => ({
  type: 'ADD_FRIEND',
  newFriend
});

export const startAddFriend = (newFriend = {}) => {
  return async (dispatch, getState) => {
    const {
      name,
      relationship,
      location,
      ranking,
      dateAdded = new Date()
    } = newFriend;
    const addNewFriend = { name, relationship, location, ranking, dateAdded };
    const config = {
      headers: {
        'x-auth': jwtToken
      }
    }
    try {
      const response = await axios.post('/api/friend', addNewFriend, config);
      dispatch(addFriend({
        _id: response.data._id,
        _creator: response.data._creator,
        ...addNewFriend
      }));
    } catch (e) {
      console.log('Error!', e);
    }
  };
};

export const populateFriendList = (friendList) => ({
  type: 'POPULATE_FRIEND_LIST',
  friendList
});

export const startPopulateFriendList = () => {
  return async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth': jwtToken
        }
      }
      const response = await axios.get('/api/friend', config);
      console.log('friend list action response', response.data);
      dispatch(populateFriendList(response.data));
    } catch (e) {
      console.log('Error!', e);
    }
  }
};
