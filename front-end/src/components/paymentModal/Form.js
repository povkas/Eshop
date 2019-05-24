import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { validateCard } from '../../actions/cardActions';

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
      number: '',
      expirationDate: '',
      securityCode: '',
      numberErrorText: '',
      expirationDateErrorText: '',
      securityCodeErrorText: '',
      error: '',
      disable: true
    };

    this.setError = this.setError.bind(this);
  }

  setError(err) {
    this.setState({ error: err });
  }

  handleChange = (e, error) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (error !== '') {
      this.setState({ [`${e.target.name}Error`]: ' ' });
    }
    this.buttonDisable();
  };

  buttonDisable = () => {
    const {
      number,
      expirationDate,
      securityCode,
      numberErrorText,
      expirationDateErrorText,
      securityCodeErrorText
    } = this.state;
    if (
      !notEmpty(numberErrorText) &&
      !notEmpty(expirationDateErrorText) &&
      !notEmpty(securityCodeErrorText) &&
      notEmpty(number) &&
      notEmpty(expirationDate) &&
      notEmpty(securityCode)
    ) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { number, expirationDate, securityCode } = this.state;
    const creditCard = {
      Number: number,
      ExpirationDate: expirationDate,
      SecurityCode: securityCode
    };
    validateCard(this.setError, creditCard, onSubmit);
  };

  render() {
    const {
      number,
      expirationDate,
      securityCode,
      numberErrorText,
      expirationDateErrorText,
      securityCodeErrorText,
      disable,
      error
    } = this.state;

    const { submitted } = this.props;

    return (
      <div>
        {!submitted ? (
          <form onSubmit={this.handleSubmit}>
            <h3>Credit card details</h3>
            <div>
              <TextField
                required
                placeholder="XXXX-XXXX-XXXX-XXXX"
                name="number"
                label="Number"
                value={number}
                onChange={this.handleChange}
                error={numberErrorText !== ''}
                helperText={numberErrorText}
                onBlur={this.validateNumber}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                required
                placeholder="YYYY/MM"
                name="expirationDate"
                label="Expiration date"
                value={expirationDate}
                onChange={this.handleChange}
                error={expirationDateErrorText !== ''}
                helperText={expirationDateErrorText}
                // onBlur={this.validateExpirationDate}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                required
                label="Security code"
                placeholder="***"
                name="securityCode"
                value={securityCode}
                onChange={this.handleChange}
                error={securityCodeErrorText !== ''}
                helperText={securityCodeErrorText}
                // onBlur={this.validateSecurityCode}
                margin="normal"
              />
            </div>
            <div>
              <Button disabled={disable} type="submit" variant="outlined">
                Provide details
              </Button>
              <div>
                <FormLabel>{error}</FormLabel>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <div>
              <InputLabel>Number: {number}</InputLabel>
            </div>
            <div>
              <InputLabel>Expiration date: {expirationDate}</InputLabel>
            </div>
            <div>
              <InputLabel>Security code: {securityCode}</InputLabel>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired
};

export default Form;
