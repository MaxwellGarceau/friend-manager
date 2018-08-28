export const addFriend = (newFriend) => ({
  type: 'ADD_FRIEND',
  newFriend
});

export const startAddFriend = (newFriend = []) => {
  return async (dispatch, getState) => {
    try {
      // CALL DATABASE HERE TO ADD NEW FRIEND
      dispatch(addFriend(newFriend));
    } catch (e) {
      console.log('Error!', e);
    }
  };
};
