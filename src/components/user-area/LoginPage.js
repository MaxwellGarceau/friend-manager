import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../routers/AppRouter';

import { startLogin } from '../../actions/auth';
import UserCredentialsForm from './UserCredentialsForm';

export class LoginPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: ''
    };
  };
  onSubmit = async (userCredentials) => {
    const response = await this.props.startLogin(userCredentials);
    if (!!response && response.name === 'Error') {
      this.setState(() => ({ error: `Error Occured **DON'T FORGET TO PRINT MONGOOSE'S VALIDATION ERRORS HERE =))))))!!!!!!**` }))
    } else {
      history.push('/dashboard');
    }
  };
  render (props) {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Friend Manager</h1>
          <p>Automate Your Social Life</p>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <UserCredentialsForm onSubmit={this.onSubmit} submitButtonTitle={'Login'}/>
          <Link className="header__title" to="/signup">
            <button className="button">Sign Up</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (userData) => dispatch(startLogin(userData))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
