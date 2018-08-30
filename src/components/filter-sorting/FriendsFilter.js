import React from 'react';
import InputRange from 'react-input-range';

import { connect } from 'react-redux';
import { startUpdateFriendListFilters } from '../../actions/filters';

class FriendsFilter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedFilters: [],
      rankingSliderValue: {
        min: 1,
        max: 5
      }
    };
  };
  generateInputField = (type, name, onChange, parent) => {
    return (
      <input
        type={type}
        name={name}
        onChange={onChange}
        data-parent={parent} />
    );
  }
  handleRankingSliderChange = (rankingSliderValue) => this.setState({ rankingSliderValue });
  handleUpdateFilter = (e) => {
    e.preventDefault();
    // Code that prepares data by setting category to object key and filter values as sub key/values
    const selectedFilters = this.state.selectedFilters;
    this.props.startUpdateFriendListFilters(selectedFilters);
    // Dummy data for filter test
    // const selectedFilters = [{
    //   active: true,
    //   filterId: 'relationshipFilter',
    //   params: ['friend', 'family']
    // }, {
    //   active: false,
    //   filterId: 'rankingFilter'
    // }];
    // this.props.startUpdateFriendListFilters(selectedFilters);
  };
  handleInputFieldChange = (e) => {
    let value;
    const input = e.target;
    const type = input.type;
    const parentName = input.dataset.parent;
    const filterCategory = input.dataset.filterCategory;
    const name = input.name;

    switch (type) {
      case 'checkbox':
        value = input.checked;
        break;
      default:
        value = input.value;
    }

    if (!value) {
      this.setState({
        selectedFilters: this.state.selectedFilters.filter((filter) => filter.filterId !== parentName)
      });
      return;
    }

    this.setState((prevState) => {
      const prevFilterState = prevState[parentName];
      // If prevFilterState AND prevFilterState.params exists then prevParams is prevFilterState.params. Else prevParams is [].
      // Written this way to avoid undefined error from trying to check an object property that doesn't exist.
      const prevParams = (prevFilterState) ? prevFilterState.params ? prevFilterState.params : [] : [];
      return this.state.selectedFilters.push({
        filterParent: parentName,
        filterCategory,
        active: true,
        type,
        params: [...prevParams, name]
      });
    });
  };
  render () {
    return (
      <div>
        <h2>Filter</h2>
        <form onSubmit={this.handleUpdateFilter}>
          <fieldset name="relationshipFilter">
            <legend>Relationship</legend>
            <input
              type="checkbox"
              name="friend"
              onChange={this.handleInputFieldChange}
              data-parent="relationshipFilter"
              data-filter-category="relationship" /> Friend
            <br />
            <input
              type="checkbox"
              name="family"
              value="family" /> Family
            <br />
            <input
              type="checkbox"
              name="acquaintance"
              value="acquaintance" /> Acquaintance
            <br />
          </fieldset>
          <fieldset name="rankingFilter">
            <legend>Ranking</legend>
            <InputRange
              maxValue={5}
              minValue={1}
              formatLabel={value => `${value} star`}
              value={this.state.rankingSliderValue}
              onChange={this.handleRankingSliderChange}
            />
            <br />
          </fieldset>
          <fieldset name="locationFilter">
            <legend>Location</legend>
            <br />
          </fieldset>
          <button>Set Filter</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startUpdateFriendListFilters: (selectedFilters) => dispatch(startUpdateFriendListFilters(selectedFilters))
});

export default connect(undefined, mapDispatchToProps)(FriendsFilter);
