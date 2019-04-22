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
      passwordErrorText: ' '
    };
    this.state = this.initialstate;
  }

  validateEmail = () => {
    let isError = false;
    const { email } = this.state;
    const errors = {
      emailErrorText: ' '
    };
    const { validEmail, isRequiredEmail } = authErrors;
    const emailRegex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;

    if (email.length !== 0) {
      if (email.length > 128 || !emailRegex.test(email)) {
        isError = true;
        errors.emailErrorText = validEmail;
      }
    } else {
      isError = true;
      errors.emailErrorText = isRequiredEmail;
    }

    this.setState({ ...errors });
    return isError;
  };

  validatePassword = () => {
    let isError = false;
    const { password } = this.state;
    const errors = {
      passwordErrorText: ' '
    };
    const { passwordLength, isRequiredPassword } = authErrors;

    if (password.length !== 0) {
      if (password.length < 8 || password.length > 255) {
        isError = true;
        errors.passwordErrorText = passwordLength;
      }
    } else {
      isError = true;
      errors.passwordErrorText = isRequiredPassword;
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
    const { email, password, emailErrorText, passwordErrorText } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          autoFocus
          name="email"
          label="Email"
          value={email}
          onChange={this.handleChange}
          error={emailErrorText !== ' '}
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
          error={passwordErrorText !== ' '}
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
