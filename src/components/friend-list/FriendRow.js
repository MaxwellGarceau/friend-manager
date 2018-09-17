import React from 'react';
import capitalize from 'lodash/capitalize';
import StarRatingComponent from 'react-star-rating-component';

import { connect } from 'react-redux';
import { startDeleteFriend } from '../../actions/friends';

class FriendRow extends React.Component {
  handleDeleteFriend = (e) => {
    const _id = e.target.dataset.friendId;
    this.props.startDeleteFriend(_id);
  };
  render (props) {
    const { friend, canEditFriends } = this.props;
    const isReadOnly = !!canEditFriends ? '' : 'readonly';
    const formattedCity = friend.location.city ? `${friend.location.city}, ` : '';
    const formattedRegion = friend.location.region ? `${friend.location.region} ` : '';
    const formattedCountry = friend.location.country ? `${friend.location.country}` : '';
    return (
      <tr key={friend._id} className="friends-list__row">
        <td className="friends-list__name"><input {...isReadOnly} className={`friends-list__input ${isReadOnly}`} value={friend.name} /></td>
        <td className="friends-list__relationship"><input {...isReadOnly} className={`friends-list__input ${isReadOnly}`} value={capitalize(friend.relationship)} /></td>
        <td className="friends-list__location"><input {...isReadOnly} className={`friends-list__input ${isReadOnly}`} value={`${formattedCity}${formattedRegion}${formattedCountry}`} /></td>
        <td className="friends-list__ranking">
          <StarRatingComponent
            name="output-friend-ranking"
            value={friend.ranking}
            starCount={5}
            renderStarIcon={() => <i className="far fa-star"></i>}
            className="manually-add-friend__dv-star-rating"
          />
          {!!canEditFriends &&
            <div className={`friends-list__delete`} data-friend-id={friend._id} onClick={this.handleDeleteFriend}>
              <i data-friend-id={friend._id} className="fas fa-times-circle"></i>
            </div>}
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startDeleteFriend: (_id) => dispatch(startDeleteFriend(_id))
});

export default connect(undefined, mapDispatchToProps)(FriendRow);