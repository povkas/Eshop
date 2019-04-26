import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import errorMessages from '../../utils/constants/registrationErrors';
import { styles, styles1 } from './Styles';
import { snackbarMessages } from '../../utils/constants';
import { addUser } from '../../utils/constants/api';

function hasNumber(myString) {
  return /\d/.test(myString);
}

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
      confirmPasswordErrorText: '',
      nameErrorText: '',
      surnameErrorText: '',
      countryErrorText: '',
      cityErrorText: '',
      addressErrorText: '',
      emailErrorText: '',
      passwordErrorText: ''
    };
  }

  validate = () => {
    const { name, surname, country, city, email, password, confirmPassword, address } = this.state;
    const errors = {
      confirmPasswordErrorText: '',
      nameErrorText: '',
      surnameErrorText: '',
      countryErrorText: '',
      cityErrorText: '',
      addressErrorText: '',
      emailErrorText: '',
      passwordErrorText: ''
    };

    if (email.length !== 0) {
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length > 128) {
        errors.emailErrorText = errorMessages.emailError;
      }
    }
    if (password.length !== 0) {
      if (password.length < 8 || password.length > 255) {
        errors.passwordErrorText = errorMessages.password;
      }
    }
    if (name.length !== 0) {
      if (name.length > 30 || hasNumber(name)) {
        errors.nameErrorText = errorMessages.nameError;
      }
    }
    if (surname.length !== 0) {
      if (surname.length > 30 || hasNumber(surname)) {
        errors.surnameErrorText = errorMessages.surnameError;
      }
    }
    if (country.length !== 0) {
      if (country.length > 30 || hasNumber(country)) {
        errors.countryErrorText = errorMessages.countryError;
      }
    }
    if (city.length !== 0) {
      if (city.length > 30 || hasNumber(city)) {
        errors.cityErrorText = errorMessages.cityError;
      }
    }
    if (address.length !== 0) {
      if (address.length > 30) {
        errors.addressErrorText = errorMessages.adressError;
      }
    }
    if (confirmPassword !== password) {
      errors.confirmPasswordErrorText = errorMessages.confirmPasswordError;
    }

    this.setState({ ...errors });
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
    e.preventDefault();
    const { name, surname, country, city, email, password, address } = this.state;
    const { passClose, openSnackbar } = this.props;

    const data = JSON.stringify({
      name,
      surname,
      country,
      city,
      address,
      email,
      password
    });

    axios
      .post(addUser, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        openSnackbar({ message: snackbarMessages.registrationSuccess, variant: 'success' });
        passClose();
      })
      .catch(error => {
        if (error.response) {
          openSnackbar({ message: snackbarMessages.registrationFailed, variant: 'error' });
        } else if (error.request) {
          openSnackbar({ message: snackbarMessages.unidentified, variant: 'error' });
        }
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
      confirmPasswordErrorText,
      nameErrorText,
      surnameErrorText,
      countryErrorText,
      cityErrorText,
      addressErrorText,
      emailErrorText,
      passwordErrorText
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
            error={notEmpty(nameErrorText)}
            onChange={this.handleChange}
            helperText={nameErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.surname}
            label="Surname"
            type={labelNames.surname}
            value={surname}
            required
            error={notEmpty(surnameErrorText)}
            onChange={this.handleChange}
            helperText={surnameErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.email}
            label="Email"
            type={labelNames.email}
            value={email}
            required
            error={notEmpty(emailErrorText)}
            onChange={this.handleChange}
            helperText={emailErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.password}
            label="Password"
            type={labelNames.password}
            value={password}
            required
            error={notEmpty(passwordErrorText)}
            onChange={this.handleChange}
            onBlur={this.validate}
            helperText={passwordErrorText}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.confirmPassword}
            label="ConfirmPassword"
            type={labelNames.password}
            value={confirmPassword}
            required
            error={notEmpty(confirmPasswordErrorText)}
            onChange={this.handleChange}
            onBlur={this.validate}
            helperText={confirmPasswordErrorText}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.country}
            label="Country"
            type={labelNames.country}
            value={country}
            required
            error={notEmpty(countryErrorText)}
            onChange={this.handleChange}
            helperText={countryErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.city}
            label="City"
            type={labelNames.city}
            value={city}
            required
            error={notEmpty(cityErrorText)}
            onChange={this.handleChange}
            helperText={cityErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.address}
            label="Address"
            type={labelNames.address}
            value={address}
            required
            error={notEmpty(addressErrorText)}
            onChange={this.handleChange}
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

Form.propTypes = {
  passClose: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles1)(Form);
