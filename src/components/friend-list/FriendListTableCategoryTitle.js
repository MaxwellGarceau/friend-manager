import React from 'react';

// import { determineSortDirection } from '../../utils/sorting-logic/main-friend-list-sorting';

class FriendListTableCategoryTitle extends React.Component {
  state = {
    sortDirection: 1,
    sortIconDirection: ''
  };
  handleSort = () => {
    this.setState((prevState) => {
      this.props.handleSort(prevState.sortDirection);
      const sortDirection = prevState.sortDirection === 1 ? -1 : 1;
      const sortIconDirection = sortDirection === 1 ? 'friends-list__sort-icon--up' : 'friends-list__sort-icon--down';
      return {
        sortDirection,
        sortIconDirection
      };
    });
  };
  render (props) {
    return (
      <th className="friends-list__category-title" onClick={this.handleSort}>
        {this.props.title} <div className={`friends-list__sort-icon-container ${this.state.sortIconDirection}`}><i
          className="fas fa-caret-right friends-list__sort-icon">
        </i></div>
      </th>
    );
  }
}

export default FriendListTableCategoryTitle;
