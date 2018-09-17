export default (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_FRIEND_LIST':
      return [...state, ...action.friendList];
    case 'ADD_FRIEND':
      return [...state, action.newFriend];
    case 'DELETE_FRIEND':
      return state.filter((friend) => friend._id !== action._id);
    case 'EDIT_FRIENDS':
      const newFriends = action.edittedFriends;
      const oldFriends = state.filter((oldFriend) => {
        return newFriends.filter((newFriend) => oldFriend._id !== newFriend._id);
      });
      return [...oldFriends, ...newFriends];
    default:
      return state;
  }
};
