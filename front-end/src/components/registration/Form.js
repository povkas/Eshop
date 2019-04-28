import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { styles, styles1 } from './Styles';
import { snackbarMessages } from '../../utils/constants';
import { addUser } from '../../utils/constants/api';
import {
  emailValidation,
  addresssValidation,
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
      addressError: ''
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

  handleChange = (e, error) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (error !== '') {
      this.setState({ [`${e.target.name}Error`]: '' });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, surname, country, city, email, password, address } = this.state;
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

    axios
      .post(addUser, data)
      .then(() => {
        openSnackbar({ message: snackbarMessages.registrationSuccess, variant: 'success' });
        passClose();
      })
      .catch(err => {
        setError(err);
      });
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
      addressError
    } = this.state;

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
      <div>
        REGISTRATION
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={styles}
            name={labelNames.name}
            label="Name"
            type={labelNames.name}
            value={name}
            required
            error={notEmpty(nameError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, nameValidation)}
            helperText={nameError}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.surname}
            label="Surname"
            type={labelNames.surname}
            value={surname}
            required
            error={notEmpty(surnameError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, surnameValidation)}
            helperText={surnameError}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.email}
            label="Email"
            type={labelNames.email}
            value={email}
            required
            error={notEmpty(emailError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, emailValidation)}
            helperText={emailError}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.password}
            label="Password"
            type={labelNames.password}
            value={password}
            required
            error={notEmpty(passwordError)}
            onChange={this.handleChange}
            onBlur={e => this.validate(e, passwordValidation)}
            helperText={passwordError}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.confirmPassword}
            label="ConfirmPassword"
            type={labelNames.password}
            value={confirmPassword}
            required
            error={notEmpty(confirmPasswordError)}
            onChange={this.handleChange}
            onBlur={e => this.confirmPasswordValidate(e, confirmPasswordValidation)}
            helperText={confirmPasswordError}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.country}
            label="Country"
            type={labelNames.country}
            value={country}
            required
            error={notEmpty(countryError)}
            onBlur={e => this.validate(e, countryValidation)}
            onChange={this.handleChange}
            helperText={countryError}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.city}
            label="City"
            type={labelNames.city}
            value={city}
            required
            error={notEmpty(cityError)}
            onBlur={e => this.validate(e, cityValidation)}
            onChange={this.handleChange}
            helperText={cityError}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.address}
            label="Address"
            type={labelNames.address}
            value={address}
            required
            error={notEmpty(addressError)}
            onBlur={e => this.validate(e, addresssValidation)}
            onChange={this.handleChange}
            helperText={addressError}
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

Form.propTypes = {
  passClose: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export default withStyles(styles1)(Form);
