import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
// import { history } from '../routers/AppRouterContainer';

export class Header extends React.Component {
  handleStartLogout = () => {
    this.props.startLogout();
    this.props.history.push('/');
  };
  render () {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/dashboard">
              <h1>Friend Manager</h1>
            </Link>
            <button className="button button--link" onClick={this.handleStartLogout}>Logout</button>
          </div>
        </div>
      </header>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(withRouter(Header));
