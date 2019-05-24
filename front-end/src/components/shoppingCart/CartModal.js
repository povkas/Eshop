import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import CartItem from './CartItem';
import Styles from './Styles';
import AlertDialog from './AlertDialog';

function modalPlace() {
  const top = 0;
  const left = 0;

  return {
    top: `${top}%`,
    right: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
function emptyModalPlace() {
  const top = 8.25;
  const left = 0;

  return {
    top: `${top}%`,
    right: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class CartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlertdialog: false
    };
    this.totalPrice = this.totalPrice.bind(this);
    this.handleCloseIfEmpty = this.handleCloseIfEmpty.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ openAlertdialog: true });
  };

  handleCloseAlertDialog = () => {
    this.setState({ openAlertdialog: false });
  };

  handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({});
  };

  handleCloseIfEmpty = () => {
    const { cartProducts, onClick: closeModal } = this.props;
    if (cartProducts.length === 1) {
      closeModal();
    }
  };

  handleCheckoutOpen() {
    const { openCheckout, onClick: closeModal } = this.props;
    closeModal();
    openCheckout();
  }

  totalPrice() {
    let total = 0;
    const { cartProducts } = this.props;
    cartProducts.forEach(product => {
      total += product.price * product.selectedQuantity;
      return total;
    });
    return total.toFixed(2);
  }

  render() {
    const {
      classes,
      open,
      onClick,
      cartProducts,
      RemoveAllProducts,
      removeFromCart,
      turnOffLeftArrow,
      openSnackbar,
      turnOffRightArrow,
      changeQuantity
    } = this.props;
    const { openAlertdialog } = this.state;
    const productCount = cartProducts.length;
    if (productCount === 0) {
      return (
        <div>
          <Modal open={open} onClose={onClick}>
            <div style={emptyModalPlace()} className={classes.paper1}>
              <h3> Your cart is empty </h3>
            </div>
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <Modal open={open} onClose={onClick}>
          <div style={modalPlace()} className={classes.paper}>
            <Grid className={classes.oneRow}>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                BimBam
              </Typography>
              <ShoppingCart className={classes.ShoppingCart} color="primary" />
            </Grid>
            <Grid>
              <div> Total price: {this.totalPrice()}€</div>
            </Grid>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <Scrollbars style={{ width: 370, height: 300 }}>
                  {cartProducts.map((cartProduct, index) => (
                    <CartItem
                      handleCloseIfEmpty={this.handleCloseIfEmpty}
                      index={index}
                      className={classes.CartItem}
                      cartProduct={cartProduct}
                      key={cartProduct.id}
                      totalPrice={this.totalPrice}
                      removeFromCart={removeFromCart}
                      turnOffLeftArrow={turnOffLeftArrow}
                      turnOffRightArrow={turnOffRightArrow}
                      changeQuantity={changeQuantity}
                      closeModal={onClick}
                      openSnackbar={openSnackbar}
                    />
                  ))}
                </Scrollbars>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignitems="flex-end"
                margin="3px"
              >
                <Button
                  className={classes.button1}
                  onClick={() => this.handleCheckoutOpen()}
                  float="left"
                  radiostyle={{ paddingRight: 5 }}
                >
                  CheckOut
                </Button>
                <Button
                  className={classes.removeButton}
                  onClick={this.handleClickOpen}
                  radiostyle={{ paddingRight: 5 }}
                >
                  Remove All
                </Button>
              </Grid>
              <AlertDialog
                closeModal={onClick}
                openAlertdialog={openAlertdialog}
                onClick={this.handleCloseAlertDialog}
                handleCloseAlertDialog={this.handleCloseAlertDialog}
                RemoveAllProducts={RemoveAllProducts}
                openSnackbar={openSnackbar}
              />
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

CartModal.propTypes = {
  classes: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  RemoveAllProducts: PropTypes.func.isRequired,
  turnOffLeftArrow: PropTypes.func.isRequired,
  turnOffRightArrow: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  openCheckout: PropTypes.func.isRequired
};

export default withStyles(Styles)(CartModal);
