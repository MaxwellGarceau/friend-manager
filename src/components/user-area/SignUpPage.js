import React from 'react';
import { connect } from 'react-redux';
// import { history } from '../../routers/AppRouterContainer';
import { withRouter } from 'react-router-dom';

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
    console.log('frontendresponse', JSON.stringify(response));
    if (!!response && !!response.response.data.errorMessage) {
      this.setState(() => ({ error: response.response.data.errorMessage }))
    } else {
      this.props.history.push('/dashboard');
      // history.push('/dashboard');
    }
  };
  handleToLogin = () => {
    this.props.history.push('/');
    // history.push('/');
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

export default withRouter(connect(undefined, mapDispatchToProps)(SignUpPage));
// export default connect(undefined, mapDispatchToProps)(SignUpPage);
