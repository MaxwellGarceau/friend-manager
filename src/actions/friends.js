export const addFriend = (newFriend) => ({
  type: 'ADD_FRIEND',
  newFriend
});

export const startAddFriend = (newFriend = {}) => {
  return async (dispatch, getState) => {
    try {
      // CALL DATABASE HERE TO ADD NEW FRIEND
      // ADD ID THAT MONGO DB GENERATES TO newFriend OBJECT AND SEND TO REDUX
      dispatch(addFriend(newFriend));
    } catch (e) {
      console.log('Error!', e);
    }
  };
};
