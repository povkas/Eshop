import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
import RemoveIcon from '@material-ui/icons/Clear';
import { snackbarMessages, defaultImage } from '../../utils/constants';
import Styles from './Styles';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  componentDidMount() {
    const { cartProduct } = this.props;
    this.setState({ quantity: cartProduct.selectedQuantity });
  }

  getQuantity = quantity => {
    this.setState({ quantity });
  };

  thatQuantity = (id, type) => {
    const { changeQuantity } = this.props;
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
    changeQuantity(id, type);
  };

  render() {
    const {
      classes,
      cartProduct,
      removeFromCart,
      totalPrice,
      openSnackbar,
      turnOffLeftArrow,
      turnOffRightArrow,
      index,
      handleCloseIfEmpty
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper2} elevation={0}>
          <Grid container spacing={16}>
            <Grid item>
              <ButtonBase className={classes.image}>
                {cartProduct.image !== undefined ? (
                  <img
                    src={`data:image/png;base64,${cartProduct.image}`}
                    className={classes.image}
                    alt="complex"
                  />
                ) : (
                  <img src={defaultImage} className={classes.image} alt="complex" />
                )}
              </ButtonBase>
            </Grid>
            <div className="item-desc">
              <div className={('title', classes.textAlign)}>{cartProduct.title}</div>
              <span>
                <div>
                  <b>Price: {cartProduct.price}$</b>
                </div>
              </span>
              <span>
                <div>
                  <b>Quantity: {cartProduct.selectedQuantity}</b>
                  <br />
                  <IconButton
                    onClick={() => {
                      this.thatQuantity(index, 'Decrement');
                      totalPrice();
                    }}
                    disabled={turnOffLeftArrow(cartProduct.id)}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      this.thatQuantity(index, 'Increment');
                      totalPrice();
                    }}
                    disabled={turnOffRightArrow(cartProduct.id)}
                  >
                    <ChevronRight />
                  </IconButton>
                </div>
              </span>
            </div>
            <Grid item>
              <IconButton
                className={(classes.remButton, classes.container)}
                color="secondary"
                onClick={() => {
                  removeFromCart(cartProduct);
                  handleCloseIfEmpty();
                  openSnackbar({
                    message: snackbarMessages.removeFromCartSuccess,
                    variant: 'neutral'
                  });
                }}
              >
                <RemoveIcon className={classes.icon} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

CartItem.propTypes = {
  classes: PropTypes.shape().isRequired,
  cartProduct: PropTypes.shape().isRequired,
  removeFromCart: PropTypes.func.isRequired,
  turnOffLeftArrow: PropTypes.func.isRequired,
  turnOffRightArrow: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  totalPrice: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  handleCloseIfEmpty: PropTypes.func.isRequired
};

export default withStyles(Styles)(CartItem);
