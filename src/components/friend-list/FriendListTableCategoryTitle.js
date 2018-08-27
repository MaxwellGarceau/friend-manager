import React from 'react';
import cloneDeep from 'lodash';

const initialState = {
  sortDirection: 1,
  sortIconDirection: '',
  iconIsNotActive: ' friends-list__sort-icon--not-active'
};
const initialStateClone = cloneDeep(initialState);

class FriendListTableCategoryTitle extends React.Component {
  constructor (props) {
    super(props);

    this.state = initialState;
  }

  // Renders component twice in order to do check. Consider refactoring in the future
  componentDidUpdate (prevProps) {
    if (this.props.activeSort !== this.props.title && this.state.sortIconDirection !== '') {
      this.setState(initialStateClone.__wrapped__);
    } else return false;
  };
  handleSort = (e) => {
    this.props.setActiveSort(this.props.title);
    this.setState((prevState) => {
      this.props.handleSort(prevState.sortDirection);
      const sortDirection = prevState.sortDirection === 1 ? -1 : 1;
      const sortIconDirection = sortDirection === 1 ? ' friends-list__sort-icon--up' : ' friends-list__sort-icon--down';
      const iconIsNotActive = '';
      return {
        sortDirection,
        sortIconDirection,
        iconIsNotActive
      };
    });
  };
  render (props) {
    return (
      <th className="friends-list__category-title" onClick={this.handleSort}>
        {this.props.title} <div className={`friends-list__sort-icon-container${this.state.sortIconDirection}${this.state.iconIsNotActive}`}><i
          className="fas fa-caret-right friends-list__sort-icon">
        </i></div>
      </th>
    );
  }
}

export default FriendListTableCategoryTitle;
