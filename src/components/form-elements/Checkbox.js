import React from 'react';

const Checkbox = (props) => {
  const {
    name,
    label,
    checked = false,
    filterCategory
  } = props.options;

  return (
    <React.Fragment>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={props.onChange}
        data-filter-category={filterCategory} />
      <label> {label}</label>
    </React.Fragment>
  );
};

export default Checkbox;
