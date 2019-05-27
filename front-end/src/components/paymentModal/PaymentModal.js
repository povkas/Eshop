import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Modal, Paper, Grid } from '@material-ui/core';
import { ClassSharp } from '@material-ui/icons';
import Styles, { getModalStyle } from './Styles';
import Form from './Form';
import { purchase } from '../../actions/cardActions';
import { patchProducts } from '../../actions/productActions';
import { snackbarMessages } from '../../utils/constants';

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
    if (e.target.name === 'securityCode' && e.target.value.length > 3) return;
    this.setState({
      [e.target.name]: e.target.value
    });
    if (error !== '') {
      this.setState({ [`${e.target.name}Error`]: ' ' }, () => this.buttonDisable());
    }
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
      notEmpty(securityCode) &&
      securityCode.length === 3
    ) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  close() {
    const { handleClose, RemoveAllProducts, rerender, openSnackbar } = this.props;
    RemoveAllProducts();
    rerender();
    openSnackbar({ message: snackbarMessages.purchaseSuccessful, variant: 'success' });
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
    const { classes, isOpen, products, handleClose, auth } = this.props;
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
          <h2 className={classes.paymentTitle}>Payment</h2>
          <Grid container justify="space-evenly">
            <div>
              <Paper className={classes.creditCardDetails}>
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
              <p> {`${auth.user.address}, ${auth.user.city}, ${auth.user.country}`}</p>
            </div>
            <div>
              <Paper className={classes.tablePaper}>
                <Table className={classes.table}>
                  <TableHead className={classes.tableHead}>
                    <TableRow className={ClassSharp.tableRow}>
                      <TableCell className={classes.tableHeader}>
                        <h4>Product</h4>
                      </TableCell>
                      <TableCell className={classes.priceColumn}>
                        <h4>Price</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                <div className={classes.tableWrapper}>
                  <div className={classes.scrollbar}>
                    <Table>
                      <TableHead>
                        {products.map(product => (
                          <TableRow key={product.id} className={classes.columnRow}>
                            <TableCell alignLeft className={classes.productRows}>
                              <span className={classes.spanStyle}>{product.title}</span>
                            </TableCell>
                            <TableCell alignLeft className={classes.priceRows}>
                              {product.selectedQuantity === 1
                                ? `${product.price}€`
                                : `${product.selectedQuantity} * ${product.price}€`}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableHead>
                    </Table>
                  </div>
                </div>
                <h3 className={classes.totalPriceTitle}>Total: {this.sum().toFixed(2)}€</h3>
              </Paper>
              <Button
                onClick={() => this.handleCheckout()}
                variant="outlined"
                disabled={!submitted}
                className={classes.validationButton}
              >
                Proceed with the payment
              </Button>
              <div className={classes.errorMessage}>{purchaseError}</div>
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
  auth: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  rerender: PropTypes.func.isRequired,
  RemoveAllProducts: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(Styles)(PaymentModal));
