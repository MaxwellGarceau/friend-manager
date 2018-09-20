import axios from 'axios';

import { getJwtToken } from '../utils/custom-validation/user-credentials';

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
    const jwtToken = getJwtToken();
    const config = {
      headers: {
        'x-auth': jwtToken
      }
    };
    try {
      const response = await axios.post('/api/friend', addNewFriend, config);
      return dispatch(addFriend({
        _id: response.data._id,
        _creator: response.data._creator,
        ...addNewFriend
      }));
    } catch (e) {
      console.log('Error!', e);
    }
  };
};

export const deleteFriend = (_id) => ({
  type: 'DELETE_FRIEND',
  _id
});

export const startDeleteFriend = (_id) => {
  return async (dispatch, getState) => {
    const jwtToken = getJwtToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth': jwtToken
      }
    };
    try {
      const response = await axios.delete(`/api/friend/${_id}`, config);
      return dispatch(deleteFriend(response.data._id));
    } catch (e) {
      console.log('Error!', e);
    }
  }
};

export const editFriend = (editedFriend, _id) => ({
  type: 'EDIT_FRIEND',
  editedFriend,
  _id
});

export const startEditFriend = (editedFriend) => {
  return async (dispatch, getState) => {
    const jwtToken = getJwtToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth': jwtToken
      }
    };
    const _id = editedFriend._id;
    try {
      const response = await axios.patch(`/api/friend/${_id}`, editedFriend, config);
      return dispatch(editFriend(response.data, response.data._id));
    } catch (e) {
      console.log('Error!', e);
    }
  }
};

export const cancelEditFriends = () => ({
  type: 'CANCEL_EDIT_FRIENDS'
});

export const startCancelEditFriends = () => {
  return (dispatch, getState) => {
    try {
      return dispatch(cancelEditFriends());
    } catch (e) {
      console.log('Error!', e);
    }
  }
};

export const populateFriendList = (friendList) => ({
  type: 'POPULATE_FRIEND_LIST',
  friendList
});

export const startPopulateFriendList = () => {
  return async (dispatch, getState) => {
    try {
      const jwtToken = getJwtToken();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth': jwtToken
        }
      };
      const response = await axios.get('/api/friend', config);
      const friendsList = response.data.map((friend) => ({
        ...friend,
        canEditFriend: false
      }));

      return dispatch(populateFriendList(friendsList));
    } catch (e) {
      console.log('Error!', e);
    }
  }
};

export const canEditFriend = (_id) => ({
  type: 'CAN_EDIT_FRIEND',
  _id
});

export const startCanEditFriend = (_id) => {
  return (dispatch) => {
    try {
      return dispatch(canEditFriend(_id));
    } catch (e) {
      console.log('Error!', e);
    }
  }
};
