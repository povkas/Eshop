import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';

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
      submitted: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    // const { number, expirationDate, securityCode } = this.state;

    // validate
    onSubmit();
    this.setState({ submitted: true });
  };

  render() {
    const {
      number,
      expirationDate,
      securityCode,
      numberErrorText,
      expirationDateErrorText,
      securityCodeErrorText,
      submitted
    } = this.state;

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
                // onBlur={this.validateNumber}
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
              <Button type="submit" variant="outlined">
                Provide details
              </Button>
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
  onSubmit: PropTypes.func.isRequired
};

export default Form;
