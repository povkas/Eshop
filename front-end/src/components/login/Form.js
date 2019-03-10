import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Form extends Component {
  constructor(props) {
    super(props); // receives parent props lol -_-
    this.initialstate = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
    this.state = this.initialstate;
  }

  handleChange = event => {
    const { email, password } = event.target;
    this.setState({ email, password }, () => {
      this.validateField(email, password);
    });
  };

  submitForm = () => {
    const { props } = this.props;
    props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  validateField(fieldName, value) {
    const { fieldValidationErrors } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      { formErrors: fieldValidationErrors, emailValid, passwordValid },
      this.validateForm
    );
  }

  validateForm() {
    const { emailValid, passwordValid } = this.state;
    this.setState({ formValid: emailValid && passwordValid });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form className="demoForm">
          <Input
            className="form-control"
            autoFocus
            id="emailIn"
            name="emailInput"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
            type="email"
          />
          <Input
            className="form-control"
            id="passwordIn"
            name="passwordInput"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
          />
        </form>
        <Button variant="outlined" onClick={this.submitForm} type="submit">
          Log in
        </Button>
      </div>
    );
  }
}

export default Form;
