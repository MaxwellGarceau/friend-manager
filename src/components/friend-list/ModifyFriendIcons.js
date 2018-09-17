import React from 'react';

import { connect } from 'react-redux';
import { startCanEditFriend } from '../../actions/friends';

class ModifyFriendIcons extends React.Component {
  state = {
    canEditFriendRow: false
  }
  handleCancelEditFriend = (e) => {
    const _id = e.target.dataset.friendId;
    this.props.handleCancelEditFriend(_id);
    !!this.state.canEditFriendRow ? this.setState({ canEditFriendRow: false }) : this.setState({ canEditFriendRow: true });
  };
  handleEditFriend = (e) => {
    const _id = e.target.dataset.friendId;
    if (!!this.state.canEditFriendRow) {
      this.setState({ canEditFriendRow: false }, () => this.props.handleEditFriend(_id));
    } else {
      this.setState({ canEditFriendRow: true }, () => this.props.startCanEditFriend(_id));
    }
  };
  render () {
    const { friend } = this.props;
    const { canEditFriendRow } = this.state;
    return (
      <React.Fragment>
        <div className={`friends-list__delete`} data-friend-id={friend._id} onClick={this.handleDeleteFriend}>
          <i data-friend-id={friend._id} className="fas fa-trash-alt"></i>
        </div>
        <div className={`friends-list__edit`} data-friend-id={friend._id} onClick={this.handleEditFriend}>
          <i data-friend-id={friend._id} className="far fa-edit"></i>
        </div>
        {!!canEditFriendRow && <div className={`friends-list__cancel-edit`} data-friend-id={friend._id} onClick={this.handleCancelEditFriend}>
          <i data-friend-id={friend._id} className="fas fa-times-circle"></i>
        </div>}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startCanEditFriend: (_id) => dispatch(startCanEditFriend(_id))
});

export default connect(undefined, mapDispatchToProps)(ModifyFriendIcons);
