import React from 'react';
import { cloneDeep } from 'lodash-es';

import { connect } from 'react-redux';
import { startCanEditFriend, startCancelEditFriend, startDeleteFriend } from '../../actions/friends';

import AlertModal from '../misc-components/AlertModal';

class ModifyFriendIcons extends React.Component {
  state = {
    showDeleteModal: false
  };
  handleCancelEditFriend = (e) => {
    const _id = e.target.dataset.friendId;
    this.props.startCancelEditFriend(_id);
  };
  handleEditFriend = (e) => {
    const _id = e.target.dataset.friendId;
    if (!!this.props.friend.canEditFriend) {
      this.props.onSubmit(_id);
    } else {
      this.props.startCanEditFriend(_id);
    }
  };
  toggleModal = () => {
    !this.state.showDeleteModal ? this.setState({ showDeleteModal: true }) : this.setState({ showDeleteModal: false });
  };
  handleDeleteFriend = () => {
    const _id = this.props.friend._id;
    this.props.startDeleteFriend(_id);
  };
  render () {
    const { friend } = this.props;
    return (
      <React.Fragment>
        <div className={`friends-list__delete`} data-friend-id={friend._id} onClick={this.toggleModal}>
          <i data-friend-id={friend._id} className="fas fa-trash-alt"></i>
        </div>
        <div className={`friends-list__edit`} data-friend-id={friend._id} onClick={this.handleEditFriend}>
          <i data-friend-id={friend._id} className="far fa-edit"></i>
        </div>
        {!!friend.canEditFriend && <div className={`friends-list__cancel-edit`} data-friend-id={friend._id} onClick={this.handleCancelEditFriend}>
          <i data-friend-id={friend._id} className="fas fa-times-circle"></i>
        </div>}
        {!!this.state.showDeleteModal && <AlertModal
          confirmAction={this.handleDeleteFriend}
          denyAction={this.toggleModal}
          mainText="Are you sure you want to delete this contact?"
          subText="This action can not be undone" />}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startCanEditFriend: (_id) => dispatch(startCanEditFriend(_id)),
  startCancelEditFriend: (_id) => dispatch(startCancelEditFriend(_id)),
  startDeleteFriend: (_id) => dispatch(startDeleteFriend(_id))
});

export default connect(undefined, mapDispatchToProps)(ModifyFriendIcons);
