import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouterContainer';
import has from 'lodash/has';

import { startLogin } from '../../actions/auth';
import { startPopulateFriendList } from '../../actions/friends';
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
    if (!!response && has(response, 'response.data.errorMessage')) {
      this.setState(() => ({ error: response.response.data.errorMessage }))
    } else {
      // Possibly use await (or something else) to force friends list to populate before page is loaded
      this.props.startPopulateFriendList();
      history.push('/dashboard');
    }
  };
  handleToSignUp = () => {
    history.push('/signup');
  };
  render (props) {
    return (
      <div className="box-layout box-layout--full-page box-layout--auth-page">
        <div className="box-layout__box box-layout__box--auth-page">
          <h1 className="box-layout__title">Friend Manager</h1>
          <p>Automate Your Social Life</p>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <UserCredentialsForm onSubmit={this.onSubmit} submitButtonTitle={'Login'}/>
          <button type="button" className="button button--auth-page" onClick={this.handleToSignUp}>Sign Up</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (userData) => dispatch(startLogin(userData)),
  startPopulateFriendList: () => dispatch(startPopulateFriendList())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
