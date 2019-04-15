import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

  validate = () => {
    let isError = false;
    const { email, password } = this.state;
    const errors = {
      emailErrorText: ' ',
      passwordErrorText: ' ',
      isEmailError: false,
      isPasswordError: false
    };

    if (email.length !== 0) {
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length > 128) {
        isError = true;
        errors.emailErrorText = 'Requires valid email';
        errors.isEmailError = true;
      }
    }
    if (password.length !== 0) {
      if (password.length < 8 || password.length > 255) {
        isError = true;
        errors.passwordErrorText = 'Password must contain at least 8 symbols';
        errors.isPasswordError = true;
      }
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
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    const userData = {
      email,
      password
    };
    onSubmit(userData);
  };

  mergedSubmitClose = e => {
    const { passClose } = this.props;
    this.handleSubmit(e);
    if (!this.validate()) passClose();
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
      <div>
        <form onSubmit={this.mergedSubmitClose}>
          <TextField
            autoFocus
            name="email"
            label="Email"
            type="email"
            value={email}
            required
            onChange={this.handleChange}
            error={isEmailError}
            helperText={emailErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            required
            onChange={this.handleChange}
            error={isPasswordError}
            onBlur={this.validate}
            helperText={passwordErrorText}
            margin="normal"
          />
          <Button variant="outlined" type="submit">
            Log in
          </Button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  passClose: PropTypes.func.isRequired
};

export default Form;
