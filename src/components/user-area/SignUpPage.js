import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';

import { startSignUp } from '../../actions/auth';
import UserCredentialsForm from './UserCredentialsForm';

export class SignUpPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: ''
    };
  };
  onSubmit = async (userCredentials) => {
    const response = await this.props.startSignUp(userCredentials);
    if (!!response && response.name === 'Error') {
      this.setState(() => ({ error: response.response.data.errorMessage }))
    } else {
      history.push('/dashboard');
    }
  };
  handleToLogin = () => {
    history.push('/');
  };
  render (props) {
    return (
      <div className="box-layout box-layout--full-page box-layout--auth-page">
        <div className="box-layout__box box-layout__box--auth-page">
          <h1 className="box-layout__title">Sign Up</h1>
          <p>Automate Your Social Life</p>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <UserCredentialsForm onSubmit={this.onSubmit} submitButtonTitle={'Sign Up'}/>
          <button className="button button--auth-page" onClick={this.handleToLogin}>Back To Login</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignUp: (userData) => dispatch(startSignUp(userData))
});

export default connect(undefined, mapDispatchToProps)(SignUpPage);
