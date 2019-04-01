import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

function hasNumber(myString) {
  return /\d/.test(myString);
}
class Form extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      address: '',
      confirmPasswordErrorText: ' ',
      nameErrorText: ' ',
      surnameErrorText: ' ',
      countryErrorText: ' ',
      cityErrorText: ' ',
      addressErrorText: ' ',
      emailErrorText: ' ',
      passwordErrorText: ' ',
      isEmailError: false,
      isPasswordError: false,
      isNameError: false,
      isSurnameError: false,
      isCountryError: false,
      isCityError: false,
      isAddressError: false,
      isConfirmPassword: false,
      registrationErrorMessage: '',
      isRegistrationError: false
    };
    this.state = this.initialstate;
  }

  validate = () => {
    let isError = false;
    const { name, surname, country, city, email, password, confirmPassword, address } = this.state;
    const errors = {
      confirmPasswordErrorText: ' ',
      nameErrorText: ' ',
      surnameErrorText: ' ',
      countryErrorText: ' ',
      cityErrorText: ' ',
      addressErrorText: ' ',
      emailErrorText: ' ',
      passwordErrorText: ' ',
      isEmailError: false,
      isPasswordError: false,
      isNameError: false,
      isSurnameError: false,
      isCountryError: false,
      isCityError: false,
      isAddressError: false,
      isConfirmPassword: false
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
    if (name.length !== 0) {
      if (name.length > 30 || hasNumber(name)) {
        isError = true;
        errors.nameErrorText =
          'Name must contain less then 30 symbols and cant contain have any numbers';
        errors.isNameError = true;
      }
    }
    if (surname.length !== 0) {
      if (surname.length > 30 || hasNumber(surname)) {
        isError = true;
        errors.surnameErrorText =
          'Surname must contain less then 30 symbols and cant contain any numbers';
        errors.isSurnameError = true;
      }
    }
    if (country.length !== 0) {
      if (country.length > 30 || hasNumber(country)) {
        isError = true;
        errors.countryErrorText =
          'Country must contain less then 30 symbols and cant contain any numbers';
        errors.iscountryError = true;
      }
    }
    if (city.length !== 0) {
      if (city.length > 30 || hasNumber(city)) {
        isError = true;
        errors.cityErrorText =
          'City must contain less then 30 symbols and cant contain any numbers';
        errors.isCityError = true;
      }
    }
    if (address.length !== 0) {
      if (address.length > 30) {
        isError = true;
        errors.addressErrorText = 'address must contain less then 30 symbols';
        errors.isAddressError = true;
      }
    }
    if (confirmPassword.length !== 0) {
      if (confirmPassword !== password) {
        isError = true;
        errors.confirmPasswordErrorText = 'Confirm password is not the same as password';
        errors.isConfirmPassword = true;
      }
    }

    this.setState({ ...errors });

    return isError;
  };

  handleChange = e => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault(); // preventing browser to reload
    const { name, surname, country, city, email, password, address } = this.state;
    const errors = {
      registrationErrorMessage: '',
      isRegistrationError: false
    };

    const url = `http://localhost:5000/api/user`;

    const data = JSON.stringify({
      name,
      surname,
      country,
      city,
      address,
      email,
      password
    });

    // https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#18_Set_the_Auth_token
    // loginUser(data);

    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        // console.log(response);
        if (response === 201) {
          errors.registrationErrorMessage = 'Registration successful';
        }
      })
      .catch(error => {
        // console.log(error.response);
        if (error.response === 422) {
          errors.registrationErrorMessage = 'User already exist';
        }
      });

    /* .then(res => {
        console.log(`Res.Data:\n${res.data}`);
      }); */
  };

  mergedSubmitClose = () => {
    const { passClose } = this.props;
    this.handleSubmit();
    if (!this.validate()) passClose();
  };

  render() {
    const {
      name,
      surname,
      email,
      password,
      confirmPassword,
      country,
      city,
      address,
      confirmPasswordErrorText,
      nameErrorText,
      surnameErrorText,
      countryErrorText,
      cityErrorText,
      addressErrorText,
      emailErrorText,
      passwordErrorText,
      isEmailError,
      isPasswordError,
      isNameError,
      isSurnameError,
      isCountryError,
      isCityError,
      isAddressError,
      isConfirmPassword
      // registrationErrorMessage
    } = this.state;

    return (
      <div>
        <h1>Registration</h1>
        {/* <form onSubmit={this.mergedSubmitClose}> */}
        <form onSubmit={this.handleSubmit}>
          <TextField
            autoFocus
            name="name"
            label="Name"
            type="name"
            value={name}
            required
            onChange={this.handleChange}
            error={isNameError}
            helperText={nameErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            autoFocus
            name="surname"
            label="Surname"
            type="surname"
            value={surname}
            required
            onChange={this.handleChange}
            error={isSurnameError}
            helperText={surnameErrorText}
            onBlur={this.validate}
            margin="normal"
          />
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
          <TextField
            name="confirmPassword"
            label="ConfirmPassword"
            type="password"
            value={confirmPassword}
            required
            onChange={this.handleChange}
            error={isConfirmPassword}
            onBlur={this.validate}
            helperText={confirmPasswordErrorText}
            margin="normal"
          />
          <TextField
            autoFocus
            name="country"
            label="Country"
            type="country"
            value={country}
            required
            onChange={this.handleChange}
            error={isCountryError}
            helperText={countryErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            autoFocus
            name="city"
            label="City"
            type="city"
            value={city}
            required
            onChange={this.handleChange}
            error={isCityError}
            helperText={cityErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            autoFocus
            name="address"
            label="Address"
            type="address"
            value={address}
            required
            onChange={this.handleChange}
            error={isAddressError}
            helperText={addressErrorText}
            onBlur={this.validate}
            margin="normal"
          />

          <div />
          <Button variant="outlined" type="submit">
            Sign up
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
