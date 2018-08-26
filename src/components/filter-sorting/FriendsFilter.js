import React from 'react';
import InputRange from 'react-input-range';

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
  render () {
    return (
      <div>
        <h2>Filter</h2>
        <form>
          <fieldset>
            <legend>Relationship</legend>
            <input type="checkbox" name="friend" value="friend" /> Friend
            <br />
            <input type="checkbox" name="friend" value="friend" /> Family
            <br />
            <input type="checkbox" name="friend" value="friend" /> Acquaintance
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
        </form>
      </div>
    );
  }
}

export default FriendsFilter;
