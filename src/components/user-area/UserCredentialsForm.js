import React from 'react';

export class SignUpPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }
  onTextInputChange = (e) => {
    const userInput = e.target.value;
    const input = e.target.name;
    this.setState(() => ({ [input]: userInput }));
  };
  onSubmit = async (e) => {
    e.preventDefault();

    // Handles data validation from front end. Backend validation is handled when the API request is made (which is not here).
    if (!this.state.email || !this.state.password) {
      this.setState(() => ({ error: 'Please set an email and password.' }));
    } else {
      this.setState(() => ({ error: '' }));
      const userCredentials = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.onSubmit(userCredentials);
    }
  };
  render (props) {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Email"
          autoFocus
          className="text-input text-input__auth"
          name="email"
          value={this.state.email}
          onChange={this.onTextInputChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="text-input text-input__auth"
          name="password"
          value={this.state.password}
          onChange={this.onTextInputChange}
        />
        <div>
          <button className="button button--auth-page">{this.props.submitButtonTitle || 'Login'}</button>
        </div>
      </form>
    );
  }
}

export default SignUpPage;
