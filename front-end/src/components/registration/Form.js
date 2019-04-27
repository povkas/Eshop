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
  adresssValidation,
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
      address: ''
    };
  }

  validate = (validationMethod, stateName) => {
    this.setState({ [stateName]: validationMethod });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
    const { name, surname, email, password, confirmPassword, country, city, address } = this.state;

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
    const validation = {
      name: nameValidation(name),
      surname: surnameValidation(surname),
      email: emailValidation(email),
      password: passwordValidation(password),
      confirmPassword: confirmPasswordValidation(password, confirmPassword),
      address: adresssValidation(address),
      city: cityValidation(city),
      country: countryValidation(country)
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
            error={notEmpty(validation.name)}
            onChange={this.handleChange}
            helperText={validation.name}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.surname}
            label="Surname"
            type={labelNames.surname}
            value={surname}
            required
            error={notEmpty(validation.surname)}
            onChange={this.handleChange}
            helperText={validation.surname}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.email}
            label="Email"
            type={labelNames.email}
            value={email}
            required
            error={notEmpty(validation.email)}
            onChange={this.handleChange}
            helperText={validation.email}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.password}
            label="Password"
            type={labelNames.password}
            value={password}
            required
            error={notEmpty(validation.password)}
            onChange={this.handleChange}
            helperText={validation.password}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.confirmPassword}
            label="ConfirmPassword"
            type={labelNames.password}
            value={confirmPassword}
            required
            error={notEmpty(validation.confirmPassword)}
            onChange={this.handleChange}
            helperText={validation.confirmPassword}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.country}
            label="Country"
            type={labelNames.country}
            value={country}
            required
            error={notEmpty(validation.country)}
            onChange={this.handleChange}
            helperText={validation.country}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.city}
            label="City"
            type={labelNames.city}
            value={city}
            required
            error={notEmpty(validation.city)}
            onChange={this.handleChange}
            helperText={validation.city}
            margin="normal"
          />
          <TextField
            style={styles}
            name={labelNames.address}
            label="Address"
            type={labelNames.address}
            value={address}
            required
            error={notEmpty(validation.address)}
            onChange={this.handleChange}
            helperText={validation.address}
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
