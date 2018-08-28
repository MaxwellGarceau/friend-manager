import { friends } from '../tests/fixtures/friends-data';

export default (state = friends, action) => {
  switch (action.type) {
    case 'ADD_FRIEND':
      return [...state, action.newFriend];
    default:
      return state;
  }
};
