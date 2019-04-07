import React from 'react';
import { omit } from 'lodash-es';

import Checkbox from './Checkbox';

class Dropdown extends React.Component {
  constructor () {
    super();

    // Initialize empty state to prevent error of undefined this.state
    this.state = {

    };
  }
  checkbox = (option) => {
    const {
      name,
      label,
      filterCategory
    } = option;

    const isChecked =
      this.state.hasOwnProperty(filterCategory) &&
      this.state[filterCategory].some((relationship) => relationship.name === name);

    return (
      <label key={`edit-friend-row-${name}-checkbox`}>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={this.handleCheckboxChange}
          data-filter-category={filterCategory}
          data-label={label} />
        {label}
      </label>
    )
  };
  handleCheckboxChange = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    const filterCategory = e.target.dataset.filterCategory;
    const label = e.target.dataset.label;

    this.setState((prevState) => {
      const validatedPrevState = prevState[filterCategory] ? prevState[filterCategory] : [];

      if (isChecked) {
        return {
          [filterCategory]: [
            ...validatedPrevState,
            {
              label,
              name
            }
          ]
        }
      } else {
        const newState = prevState[filterCategory].filter((relationship) => relationship.name !== name);
        return {
          [filterCategory]: newState
        }
      }
    }, () => {
      this.props.handleCheckboxChange(this.state);
    });
  };
  render () {
    return (
      <React.Fragment>
        <div>
          {this.props.options.map((option) => this.checkbox(option))}
        </div>
      </React.Fragment>
    );
  }
}

export default Dropdown;
