import React from 'react';
import capitalize from 'lodash/capitalize';
import StarRatingComponent from 'react-star-rating-component';
import ModifyFriendIcons from './ModifyFriendIcons';

// import { connect } from 'react-redux';
// import { startDeleteFriend } from '../../actions/friends';

// class FriendRow extends React.Component {
// state = {
//   friend: this.props.friend
// };
// handleDeleteFriend = (e) => {
//   const _id = e.target.dataset.friendId;
//   this.props.startDeleteFriend(_id);
// };
// setFriendName = (e, friendUpdate) => {
//   const update = e.target.value;
//   this.setState({ [friendUpdate]: update });
// }
// render (props) {
const FriendRow = (props) => {
  const { friend, canEditFriends } = props;
  const formattedCity = friend.location.city ? `${friend.location.city}, ` : '';
  const formattedRegion = friend.location.region ? `${friend.location.region} ` : '';
  const formattedCountry = friend.location.country ? `${friend.location.country}` : '';
  return (
    <tr key={friend._id} className="friends-list__row">
      <td className="friends-list__name">{friend.name}</td>
      <td className="friends-list__relationship">{capitalize(friend.relationship)}</td>
      <td className="friends-list__location">{`${formattedCity}${formattedRegion}${formattedCountry}`}</td>
      <td className="friends-list__ranking">
        <StarRatingComponent
          name="output-friend-ranking"
          value={friend.ranking}
          starCount={5}
          renderStarIcon={() => <i className="far fa-star"></i>}
          className="manually-add-friend__dv-star-rating"
        />
        {!!canEditFriends && <ModifyFriendIcons friend={friend} />}
      </td>
    </tr>
  );
}
// }
// }

// const mapDispatchToProps = (dispatch) => ({
//   startDeleteFriend: (_id) => dispatch(startDeleteFriend(_id))
// });

// export default connect(undefined, mapDispatchToProps)(FriendRow);
export default FriendRow;
