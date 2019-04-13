import React from 'react';
import capitalize from 'lodash/capitalize';
import StarRatingComponent from 'react-star-rating-component';
import ModifyFriendIcons from './ModifyFriendIcons';

import { displayFriendRelationship } from '../../utils/component-logic/friend-relationship-property';

const FriendRow = (props) => {
  const { friend, canEditFriends } = props;
  const formattedCity = friend.location.city ? `${friend.location.city}, ` : '';
  const formattedRegion = friend.location.region ? `${friend.location.region} ` : '';
  const formattedCountry = friend.location.country ? `${friend.location.country}` : '';
  return (
    <tr key={friend._id} className="friends-list__row">
      <td className="friends-list__name">{friend.name}</td>
      <td className="friends-list__relationship">{displayFriendRelationship(friend.relationship)}</td>
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

export default FriendRow;
