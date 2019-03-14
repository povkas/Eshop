import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      email: '',
      password: '',
      emailError: '',
      isEmailError: false,
      passwordError: ''
    };
    this.state = this.initialstate;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mergedSubmitClose = this.mergedSubmitClose.bind(this);
  }

  validate = () => {
    let isError = false;
    const { email } = this.state;
    const errors = {
      emailError: '',
      passwordError: '',
      isEmailError: false
    };

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      isError = true;
      errors.emailError = 'Requires valid email';
      errors.isEmailError = true;
    }

    this.setState({ ...errors });

    return isError;
  };

  handleChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const { email, password } = this.state;

    if (!this.validate()) {
      this.setState({ email, password });
    }
  }

  mergedSubmitClose() {
    const { passClose } = this.props;
    this.handleSubmit();
    if (!this.validate()) passClose();
  }

  render() {
    const { email, password, emailError, isEmailError, passwordError } = this.state;

    return (
      <div>
        <form>
          {/* <form onSubmit={this.handleSubmit}> */}
          {/* tada email Textfield rodo notificationa hoverinus be red */}
          <TextField
            autoFocus
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={this.handleChange}
            error={isEmailError}
            helperText={emailError}
            // this.validate or this.handleSubmit
            onBlur={this.validate}
          />
          <br />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={this.handleChange}
            // error={passwordError}
            helperText={passwordError}
          />
          {/* <Button variant="outlined" type="submit">
            Log in
          </Button> */}
        </form>
        <Button variant="outlined" onClick={this.mergedSubmitClose}>
          Log in
        </Button>
      </div>
    );
  }
}

export default Form;
