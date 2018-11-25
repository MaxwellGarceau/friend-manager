// Need to double check to make sure this works
export const findFriendById = (friendsList, friendId) => {
  return friendsList.filter((friend) => friend._id === friendId)[0];
}
