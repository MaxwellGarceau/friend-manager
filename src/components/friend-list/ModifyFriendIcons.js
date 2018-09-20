import React from 'react';
import { cloneDeep } from 'lodash-es';

import { connect } from 'react-redux';
import { startCanEditFriend } from '../../actions/friends';

class ModifyFriendIcons extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      canEditFriendRow: this.props.canEditFriendRow ? this.props.canEditFriendRow : false
    }
  }
  handleCancelEditFriend = (e) => {
    const _id = e.target.dataset.friendId;
    // MAYBE use _id of friend being edited and call an action in redux to make the selectred friend unEditable.
    // If that destroys the EditFriendRow componenet for the friend being edited then this would be the best solution
    this.props.handleCancelEditFriend();
    // Might not need this line if I reset the redux property of the friend being edited to canEditFriend: false
    !!this.state.canEditFriendRow ? this.setState({ canEditFriendRow: false }) : this.setState({ canEditFriendRow: true });
  };
  handleEditFriend = (e) => {
    const _id = e.target.dataset.friendId;
    if (!!this.state.canEditFriendRow) {
      // this.setState({ canEditFriendRow: false });
      console.log('id', _id);
      this.props.onSubmit(_id);
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

// const mapStateToProps = (state, ownProps) => ({
//   currentFriend: findFriendById(state.friends, ownProps.friend)
// });

export default connect(undefined, mapDispatchToProps)(ModifyFriendIcons);
