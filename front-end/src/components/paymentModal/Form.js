import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { validateCard } from '../../actions/cardActions';
import Styles from './Styles';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };

    this.setError = this.setError.bind(this);
  }

  setError(err) {
    this.setState({ error: err });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, number, expirationDate, securityCode } = this.props;
    const creditCard = {
      Number: number,
      ExpirationDate: expirationDate,
      SecurityCode: securityCode
    };
    validateCard(this.setError, creditCard, onSubmit);
  };

  render() {
    const {
      classes,
      number,
      expirationDate,
      securityCode,
      numberErrorText,
      expirationDateErrorText,
      securityCodeErrorText,
      handleChange,
      submitted,
      disable
    } = this.props;
    const { error } = this.state;

    return (
      <div>
        {!submitted ? (
          <form onSubmit={this.handleSubmit}>
            <div className={classes.title}>Credit card details </div>
            <div>
              <TextField
                required
                placeholder="XXXX-XXXX-XXXX-XXXX"
                name="number"
                label="Number"
                value={number}
                onChange={handleChange}
                error={numberErrorText !== ''}
                helperText={numberErrorText}
                onBlur={this.validateNumber}
                margin="dense"
              />
            </div>
            <div>
              <TextField
                required
                placeholder="YYYY/MM"
                name="expirationDate"
                label="Expiration date"
                value={expirationDate}
                onChange={handleChange}
                error={expirationDateErrorText !== ''}
                helperText={expirationDateErrorText}
                // onBlur={this.validateExpirationDate}
                margin="dense"
              />
            </div>
            <div>
              <TextField
                required
                label="Security code"
                placeholder="***"
                name="securityCode"
                value={securityCode}
                onChange={handleChange}
                error={securityCodeErrorText !== ''}
                helperText={securityCodeErrorText}
                // onBlur={this.validateSecurityCode}
                margin="dense"
              />
            </div>
            <div>
              <Button
                disabled={disable}
                type="submit"
                variant="outlined"
                className={classes.validationButton}
              >
                Provide details
              </Button>
              <div>
                <FormLabel className={classes.purchaseError}>{error}</FormLabel>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <div className={classes.title}>Credit card details </div>
            <div>
              <InputLabel>Number: {number} </InputLabel>
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
  classes: PropTypes.PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  number: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  securityCode: PropTypes.string.isRequired,
  numberErrorText: PropTypes.string.isRequired,
  expirationDateErrorText: PropTypes.string.isRequired,
  securityCodeErrorText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired
};

export default withStyles(Styles)(Form);
