export default (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_FRIEND_LIST':
      return [...state, ...action.friendList];
    case 'ADD_FRIEND':
      return [...state, action.newFriend];
    case 'DELETE_FRIEND':
      return state.filter((friend) => friend._id !== action._id);
    default:
      return state;
  }
};
