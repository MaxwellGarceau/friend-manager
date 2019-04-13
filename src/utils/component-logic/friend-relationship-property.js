// Old - used when friend relationship data was an object
// export const displayFriendRelationship = (relationships = {}) => {
//   const assignedRelationships = [];
//   for (const friendType in relationships) {
//     if (relationships[friendType]) {
//       assignedRelationships.push(friendType);
//     }
//   }
//   return assignedRelationships.join(', ');
// }

export const displayFriendRelationship = (relationships = []) => {
  return relationships.map((relationship) => relationship.label).join(', ');
}
