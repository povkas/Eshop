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
      passwordError: ''
    };
    this.state = this.initialstate;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = () => {
    let isError = false;
    const { email } = this.state;
    const errors = {
      emailError: '',
      passwordError: ''
    };

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      isError = true;
      errors.emailError = 'Requires valid email';
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
    const err = this.validate();

    if (!err) {
      this.setState({ email, password });
    }
  }

  render() {
    const { email, password, emailError, passwordError } = this.state;

    return (
      <div>
        <form>
          <TextField
            autoFocus
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={this.handleChange}
            error={emailError}
            helperText={emailError}
          />
          <br />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={this.handleChange}
            error={passwordError}
            helperText={passwordError}
          />
        </form>
        <br />
        <Button variant="outlined" onClick={this.handleSubmit}>
          Log in
        </Button>
      </div>
    );
  }
}

export default Form;