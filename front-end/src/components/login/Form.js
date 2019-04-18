import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { authErrors } from '../../utils/constants';

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      email: '',
      password: '',
      emailErrorText: ' ',
      isEmailError: false,
      passwordErrorText: ' ',
      isPasswordError: false
    };
    this.state = this.initialstate;
  }

  validateEmail = () => {
    let isError = false;
    const { email } = this.state;
    const errors = {
      emailErrorText: ' ',
      isEmailError: false
    };
    const { validEmail, isRequiredEmail } = authErrors;

    if (email.length !== 0) {
      if (
        email.indexOf('@') === -1 ||
        email.indexOf('.') === -1 ||
        email.length > 128 ||
        email.indexOf('@') > email.lastIndexOf('.') ||
        email.endsWith('.')
      ) {
        isError = true;
        errors.emailErrorText = validEmail;
        errors.isEmailError = true;
      }
    } else {
      isError = true;
      errors.emailErrorText = isRequiredEmail;
      errors.isEmailError = true;
    }

    this.setState({ ...errors });
    return isError;
  };

  validatePassword = () => {
    let isError = false;
    const { password } = this.state;
    const errors = {
      passwordErrorText: ' ',
      isPasswordError: false
    };
    const { passwordLength, isRequiredPassword } = authErrors;

    if (password.length !== 0) {
      if (password.length < 8 || password.length > 255) {
        isError = true;
        errors.passwordErrorText = passwordLength;
        errors.isPasswordError = true;
      }
    } else {
      isError = true;
      errors.passwordErrorText = isRequiredPassword;
      errors.isPasswordError = true;
    }

    this.setState({ ...errors });
    return isError;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, passClose } = this.props;
    const { email, password } = this.state;
    const userData = {
      email,
      password
    };
    if (!this.validateEmail() && !this.validatePassword()) {
      onSubmit(userData);
      passClose();
    }
  };

  render() {
    const {
      email,
      password,
      emailErrorText,
      isEmailError,
      passwordErrorText,
      isPasswordError
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          autoFocus
          name="email"
          label="Email"
          value={email}
          onChange={this.handleChange}
          error={isEmailError}
          helperText={emailErrorText}
          onBlur={this.validateEmail}
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={this.handleChange}
          error={isPasswordError}
          helperText={passwordErrorText}
          onBlur={this.validatePassword}
          margin="normal"
        />
        <Button variant="outlined" type="submit">
          Log in
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  passClose: PropTypes.func.isRequired
};

export default Form;
