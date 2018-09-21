export default (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_FRIEND_LIST':
      return [...action.friendList];
    case 'ADD_FRIEND':
      return [...state, action.newFriend];
    case 'DELETE_FRIEND':
      return state.filter((friend) => friend._id !== action._id);
    case 'EDIT_FRIEND':
      const filteredState = state.filter((friend) => friend._id !== action._id);
      return [...filteredState, action.editedFriend];
    case 'CAN_EDIT_FRIEND':
      return state.map((friend) => {
        if (friend._id === action._id) {
          return {
            ...friend,
            canEditFriend: true
          }
        } else return friend;
      });
    case 'CANCEL_EDIT_FRIEND':
      return state.map((friend) => {
        if (friend._id === action._id) {
          return {
            ...friend,
            canEditFriend: false
          }
        } else return friend;
      });
    case 'CANCEL_EDIT_FRIENDS':
      return state.map((friend) => ({
        ...friend,
        canEditFriend: false
      }));
    default:
      return state;
  }
};
