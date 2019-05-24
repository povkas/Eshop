import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
import RemoveIcon from '@material-ui/icons/Clear';
import { snackbarMessages } from '../../utils/constants';
import Styles from './Styles';

// const styles = theme => ({
//   root: {
//     flexGrow: 1
//   },
//   container: {
//     ...theme.absoluteFillObject,
//     alignSelf: 'flex-end',
//     marginTop: -5,
//     position: 'absolute'
//   },
//   paper: {
//     padding: theme.spacing.unit,
//     margin: 'auto',
//     maxWidth: '500%',
//     marginRight: '2px'
//   },
//   textAlign: {
//     flexDirection: 'row',
//     flex: 1,
//     maxWidth: '172px',
//     whiteSpace: 'pre-wrap',
//     flexWrap: 'wrap'
//   },
//   image: {
//     width: 115,
//     height: 115
//   }
// });

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
                <img
                  src={`data:image/png;base64,${cartProduct.image}`}
                  className={classes.image}
                  alt="complex"
                />
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
