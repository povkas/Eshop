import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import axios from 'axios';
import { snackbarMessages } from '../../utils/constants';
import { addUser } from '../../utils/constants/api';
import {
  emailValidation,
  addressValidation,
  countryValidation,
  nameValidation,
  surnameValidation,
  passwordValidation,
  confirmPasswordValidation,
  cityValidation
} from '../../validation';

function notEmpty(myString) {
  if (myString !== '') {
    return true;
  }
  return false;
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      address: '',
      nameError: '',
      surnameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      countryError: '',
      cityError: '',
      addressError: '',
      disable: true
    };
  }

  validate = (e, method) => {
    this.setState({ [`${e.target.name}Error`]: method(e.target.value) });
  };

  confirmPasswordValidate = (e, method) => {
    const { password } = this.state;
    this.setState({
      [`${e.target.name}Error`]: method(e.target.value, password)
    });
  };

  buttonDisable = () => {
    const { name, surname, email, password, confirmPassword, country, city, address } = this.state;
    if (
      notEmpty(name) &&
      notEmpty(surname) &&
      notEmpty(confirmPassword) &&
      notEmpty(country) &&
      notEmpty(city) &&
      notEmpty(address) &&
      notEmpty(email) &&
      notEmpty(password)
    ) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  handleChange = (e, error) => {
    if (error !== '') {
      this.setState({ [`${e.target.name}Error`]: '' });
    }
    this.setState({ [e.target.name]: e.target.value }, () => this.buttonDisable());
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      surname,
      country,
      city,
      email,
      password,
      address,
      nameError,
      surnameError,
      emailError,
      passwordError,
      confirmPasswordError,
      countryError,
      cityError,
      addressError
    } = this.state;
    const { passClose, openSnackbar, setError } = this.props;

    const data = {
      name,
      surname,
      country,
      city,
      address,
      email,
      password
    };
    if (
      !notEmpty(emailError) &&
      !notEmpty(passwordError) &&
      !notEmpty(nameError) &&
      !notEmpty(surnameError) &&
      !notEmpty(confirmPasswordError) &&
      !notEmpty(countryError) &&
      !notEmpty(cityError) &&
      !notEmpty(addressError)
    ) {
      axios
        .post(addUser, data)
        .then(() => {
          openSnackbar({ message: snackbarMessages.registrationSuccess, variant: 'success' });
          passClose();
        })
        .catch(err => {
          setError(err);
        });
    }
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
      nameError,
      surnameError,
      emailError,
      passwordError,
      confirmPasswordError,
      countryError,
      cityError,
      addressError,
      disable
    } = this.state;
    const { classes } = this.props;

    const labelNames = {
      name: 'name',
      surname: 'surname',
      email: 'email',
      password: 'password',
      confirmPassword: 'confirmPassword',
      city: 'city',
      country: 'country',
      address: 'address'
    };

    return (
      <div className={classes.layout}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            className={classes.textFields}
            name={labelNames.name}
            label="Name"
            type={labelNames.name}
            value={name}
            error={notEmpty(nameError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, nameValidation)}
            helperText={nameError}
            margin="normal"
          />
          <TextField
            className={classes.textFields}
            name={labelNames.surname}
            label="Surname"
            type={labelNames.surname}
            value={surname}
            error={notEmpty(surnameError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, surnameValidation)}
            helperText={surnameError}
            margin="normal"
          />
          <TextField
            className={classes.textFields}
            name={labelNames.email}
            label="Email"
            type={labelNames.email}
            value={email}
            error={notEmpty(emailError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, emailValidation)}
            helperText={emailError}
            margin="normal"
          />
          <TextField
            className={classes.textFields}
            name={labelNames.password}
            label="Password"
            type={labelNames.password}
            value={password}
            error={notEmpty(passwordError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, passwordValidation)}
            helperText={passwordError}
            margin="normal"
          />
          <TextField
            className={classes.textFields}
            name={labelNames.confirmPassword}
            label="Confirm Password"
            type={labelNames.password}
            value={confirmPassword}
            error={notEmpty(confirmPasswordError)}
            onChange={this.handleChange}
            onBlur={e => this.confirmPasswordValidate(e, confirmPasswordValidation)}
            helperText={confirmPasswordError}
            margin="normal"
          />
          <TextField
            className={classes.textFields}
            name={labelNames.country}
            label="Country"
            type={labelNames.country}
            value={country}
            error={notEmpty(countryError)}
            onBlur={e => this.validate(e, countryValidation)}
            onChange={this.handleChange}
            helperText={countryError}
            margin="normal"
          />
          <TextField
            className={classes.textFields}
            name={labelNames.city}
            label="City"
            type={labelNames.city}
            value={city}
            error={notEmpty(cityError)}
            onBlur={e => this.validate(e, cityValidation)}
            onChange={this.handleChange}
            helperText={cityError}
            margin="normal"
          />
          <TextField
            className={classes.textFields}
            name={labelNames.address}
            label="Address"
            type={labelNames.address}
            value={address}
            error={notEmpty(addressError)}
            onBlur={e => this.validate(e, addressValidation)}
            onChange={this.handleChange}
            helperText={addressError}
            margin="normal"
          />
          <div />
          <div className={classes.button}>
            <Button className={classes.button} disabled={disable} variant="outlined" type="submit">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  passClose: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  setError: PropTypes.func.isRequired
};

export default Form;
