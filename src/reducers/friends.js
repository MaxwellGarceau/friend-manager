export default (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_FRIEND_LIST':
      return [...state, ...action.friendList];
    case 'ADD_FRIEND':
      return [...state, action.newFriend];
    case 'DELETE_FRIEND':
      return state.filter((friend) => friend._id !== action._id);
    case 'EDIT_FRIEND':
      const filteredState = state.filter((friend) => friend._id !== action._id);
      return [...filteredState, action.editedFriend];
      // return state.map((oldFriend) => {
      //   if (oldFriend._id === action.edittedFriend._id) {
      //     return {
      //       ...oldFriend,
      //       ...action.edittedFriend
      //     }
      //   } else return oldFriend;
      // });
    case 'CAN_EDIT_FRIEND':
      return state.map((friend) => {
        if (friend._id === action._id) {
          return {
            ...friend,
            canEditFriend: true
          }
        } else return friend;
      });
    // case 'EDIT_FRIENDS':
    //   const newFriends = action.edittedFriends;
    //   const oldFriends = state.filter((oldFriend) => {
    //     return newFriends.filter((newFriend) => oldFriend._id !== newFriend._id);
    //   });
    //   return [...oldFriends, ...newFriends];
    default:
      return state;
  }
};
