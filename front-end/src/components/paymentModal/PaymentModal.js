import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, Modal, Paper, Grid } from '@material-ui/core';
import Styles, { getModalStyle } from './Styles';
import Form from './Form';
import { purchase } from '../../actions/cardActions';
import { patchProducts } from '../../actions/productActions';

function notEmpty(myString) {
  if (myString !== '') {
    return true;
  }
  return false;
}

class PaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      expirationDate: '',
      securityCode: '',
      numberErrorText: '',
      expirationDateErrorText: '',
      securityCodeErrorText: '',
      submitted: false,
      disable: true,
      purchaseError: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.setError = this.setError.bind(this);
    this.onClose = this.onClose.bind(this);
    this.close = this.close.bind(this);
    this.changeProducts = this.changeProducts.bind(this);
  }

  onClose() {
    this.setState({ submitted: false });
  }

  onSubmit = () => {
    this.setState({ submitted: true });
  };

  setError(err) {
    this.setState({ purchaseError: err });
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

  close() {
    const { handleClose, RemoveAllProducts, rerender } = this.props;
    RemoveAllProducts();
    rerender();
    handleClose();
    this.onClose();
  }

  changeProducts() {
    const { products } = this.props;
    const { purchaseError } = this.state;

    if (purchaseError === '') {
      products.forEach(product =>
        patchProducts(
          product.id,
          product.quantity - product.selectedQuantity,
          this.setError,
          this.close
        )
      );
    }
  }

  handleCheckout() {
    const { number } = this.state;

    this.setState({ purchaseError: '' }, () =>
      purchase(number, this.sum(), this.setError, this.changeProducts)
    );
  }

  sum() {
    const { products } = this.props;
    let sum = 0;
    products.forEach(element => {
      sum += element.price * element.selectedQuantity;
    });
    return sum;
  }

  render() {
    const { classes, isOpen, products, handleClose } = this.props;
    const {
      number,
      expirationDate,
      securityCode,
      numberErrorText,
      expirationDateErrorText,
      securityCodeErrorText,
      submitted,
      disable,
      purchaseError
    } = this.state;
    return (
      <Modal open={isOpen} onClose={handleClose}>
        <Paper style={getModalStyle()} className={classes.paper}>
          <h2 style={{ marginLeft: '75px' }}>Payment</h2>
          <Grid container justify="space-evenly">
            <div>
              <Paper className={classes.creditCardDetails} justify="space-evenly">
                <Form
                  onSubmit={this.onSubmit}
                  submitted={submitted}
                  number={number}
                  expirationDate={expirationDate}
                  securityCode={securityCode}
                  numberErrorText={numberErrorText}
                  expirationDateErrorText={expirationDateErrorText}
                  securityCodeErrorText={securityCodeErrorText}
                  handleChange={this.handleChange}
                  disable={disable}
                />
              </Paper>
              <h4>Shipping to</h4>
              <p> Address, City</p>
            </div>
            <div>
              <Paper className={classes.tablePaper} justify="space-evenly">
                <Table className={classes.table}>
                  <Scrollbars className={classes.table}>
                    <TableHead>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableHead>
                    <TableBody>
                      {products.map(product => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <span
                              style={{
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                width: '150px',
                                display: 'block',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {product.title}
                            </span>
                          </TableCell>
                          <TableCell align="right">
                            {product.selectedQuantity === 1
                              ? `${product.price}`
                              : `${product.selectedQuantity} * ${product.price}€`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Scrollbars>
                </Table>
                <h3 align="right">Total: {this.sum().toFixed(2)}€</h3>
              </Paper>
              <Button
                onClick={() => this.handleCheckout()}
                variant="outlined"
                disabled={!submitted}
                className={classes.validationButton}
              >
                Proceed with the payment
              </Button>
              <div>{purchaseError}</div>
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
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  rerender: PropTypes.func.isRequired,
  RemoveAllProducts: PropTypes.func.isRequired
};

export default withStyles(Styles)(PaymentModal);
