import React from 'react';

class Checkbox extends React.Component {
  handleCheckboxChange = () => {

  };
  render () {
    const {
      name,
      label,
      checked = false,
      filterCategory
    } = this.props.options;

    return (
      <React.Fragment>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={this.props.sendCheckboxChange}
          data-filter-category={filterCategory} />
        <label> {label}</label>
      </React.Fragment>
    );
  }
};

export default Checkbox;
