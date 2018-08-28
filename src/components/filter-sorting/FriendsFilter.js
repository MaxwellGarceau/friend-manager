import React from 'react';
import InputRange from 'react-input-range';

import { connect } from 'react-redux';
import { startUpdateFriendListFilters } from '../../actions/filters';

class FriendsFilter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rankingSliderValue: {
        min: 1,
        max: 5
      }
    };
  }
  handleRankingSliderChange = (rankingSliderValue) => this.setState({ rankingSliderValue });
  handleUpdateFilter = (e) => {
    e.preventDefault();
    // Code that prepares data by setting category to object key and filter values as sub key/values

    // Dummy data for filter test
    const selectedFilters = [{
      active: true,
      filterId: 'relationshipFilter',
      params: ['friend', 'family']
    }, {
      active: false,
      filterId: 'rankingFilter'
    }];
    this.props.startUpdateFriendListFilters(selectedFilters);
  };
  render () {
    return (
      <div>
        <h2>Filter</h2>
        <form onSubmit={this.handleUpdateFilter}>
          <fieldset>
            <legend>Relationship</legend>
            <input type="checkbox" name="friend" value="friend" /> Friend
            <br />
            <input type="checkbox" name="family" value="family" /> Family
            <br />
            <input type="checkbox" name="acquaintance" value="acquaintance" /> Acquaintance
            <br />
          </fieldset>
          <fieldset>
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
          <fieldset>
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
