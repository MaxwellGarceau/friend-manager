import React from 'react';

class Dropdown extends React.Component {
  constructor (props) {
    super(props);
    const { defaultSelection, dropdownType } = props;

    // Sets which checkboxes will be checked on load
    this.state = {
      [dropdownType]: defaultSelection ? defaultSelection : []
    };
  }
  checkbox = (option) => {
    const {
      name,
      label
    } = option;
    const filterCategory = this.props.dropdownType;

    const isChecked =
      this.state.hasOwnProperty(filterCategory) &&
      this.state[filterCategory].length > 0 &&
      this.state[filterCategory].some((filterCategory) => filterCategory.name === name);

    return (
      <label className="dropdown-label" key={`edit-friend-row-${name}-checkbox`}>
        <input
          className="dropdown-input"
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={this.handleCheckboxClick}
          data-filter-category={filterCategory}
          data-label={label} />
        {label}
      </label>
    )
  };
  handleCheckboxChange = ({ name, isChecked, filterCategory, label }) => {
    this.setState((prevState) => {
      const validatedPrevState = prevState[filterCategory] ? prevState[filterCategory] : [];

      if (isChecked) {
        return {
          [filterCategory]: [
            ...validatedPrevState,
            {
              label,
              name,
              filterCategory
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
  handleCheckboxClick = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    const filterCategory = this.props.dropdownType;
    const label = e.target.dataset.label;
    this.handleCheckboxChange({ name, isChecked, filterCategory, label });
  };
  setDefaultSelection = () => {
    const defaultSelection = this.props.defaultSelection ? this.props.defaultSelection : [];

    if (defaultSelection.length > 0) {
      return this.props.options.filter((option) => {
        return defaultSelection.filter((defaultOption) => defaultOption === option.name).length > 0;
      });
    }
  };
  render () {
    return (
      <React.Fragment>
        <div className="dropdown-container">
          {this.props.options.map((option) => this.checkbox(option))}
        </div>
      </React.Fragment>
    );
  }
}

export default Dropdown;
