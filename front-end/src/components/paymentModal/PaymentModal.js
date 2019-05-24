import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal, Paper, Grid } from '@material-ui/core';
import Styles, { getModalStyle } from './Styles';
import Form from './Form';

class PaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  onClose() {
    this.setState({ submitted: false });
  }

  onSubmit = () => {
    this.setState({ submitted: true });
  };

  sum() {
    const { products } = this.props;
    let sum = 0;
    products.forEach(element => {
      sum += element.price * element.selectedQuantity;
    });
    return sum;
  }

  render() {
    const { classes, isOpen, handleClose } = this.props;
    const { submitted } = this.state;
    return (
      <Modal open={isOpen} onClose={handleClose}>
        <Paper style={getModalStyle()} className={classes.paper}>
          <h2>Payment</h2>
          <Grid container justify="space-evenly" alignItems="center">
            <div>
              <Paper style={{ padding: '24px 24px 24px 24px', width: 450 }} justify="space-evenly">
                <Form onSubmit={this.onSubmit} submitted={submitted} />
              </Paper>
              <h4>Shipping to</h4>
              <p> Address, City</p>
            </div>
            <div>
              <h3>Total: {this.sum()}€</h3>
              <Button
                onClick={() => {
                  handleClose();
                  this.onClose();
                }}
                variant="outlined"
                disabled={!submitted}
              >
                Proceed with the payment
              </Button>
            </div>
          </Grid>
        </Paper>
      </Modal>
    );
  }
}

PaymentModal.propTypes = {
  classes: PropTypes.shape().isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default withStyles(Styles)(PaymentModal);
