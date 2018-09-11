import axios from 'axios';
import moment from 'moment';

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
      dateAdded = moment().toDate()
    } = newFriend;
    const addNewFriend = { name, relationship, location, ranking, dateAdded };
    try {
      const response = await axios.post('/api/friend', addNewFriend);
      dispatch(addFriend({
        ...addNewFriend,
        id: response.data._id
      }));
    } catch (e) {
      console.log('Error!', e);
    }
  };
};
