import React from 'react';

import Checkbox from './Checkbox';

class Dropdown extends React.Component {
  constructor () {
    super();

    this.state = {
      showCheckboxes: false
    }
  };
  toggleShowCheckboxes = () => {
    const showCheckboxes = this.state.showCheckboxes ? false : true;
    this.setState({ showCheckboxes });
  };
  handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const checkboxChecked = e.target.checked;
    const filterCategory = e.target.dataset.filterCategory;

    this.setState((prevState) => ({
      [filterCategory]: {
        ...prevState[filterCategory],
        [checkboxName]: checkboxChecked
      }
    }), () => {
      this.props.handleCheckboxChange(this.state[filterCategory]);
    });
  };
  render () {
    return (
      <React.Fragment>
        <div onClick={this.toggleShowCheckboxes}>Show Relationships</div>
        {
          this.state.showCheckboxes &&
          <div>
            {this.props.options.map((option) => {
              return <Checkbox key={`edit-friend-row-${option.name}-checkbox`} options={option} onChange={this.handleCheckboxChange} />;
            })}
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Dropdown;
