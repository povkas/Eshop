import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal, Divider, Typography, Grid } from '@material-ui/core';
import ColorSelect from './ColorSelect';
import Styles, { getModalStyle } from './Styles';
import QuantitySelect from './QuantitySelect';

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    const { quantity } = this.props;
    this.state = {
      color: '',
      quantity
    };
  }

  getColor = color => {
    this.setState({ color });
  };

  getQuantity = quantity => {
    this.setState({ quantity });
  };

  render() {
    const { classes, openModal, handleClose, product } = this.props;

    return (
      <Modal open={openModal} onClose={handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <img
              src={`data:image/png;base64,${product.image}`}
              alt={product.title}
              className={classes.image}
            />
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center" justify="space-around">
            <Grid item xs={4}>
              <Typography variant="h5">Cost: {product.price}€</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5">Rating:</Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={this.handleToCart}>
                <Typography variant="h6">Add to cart</Typography>
              </Button>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h6">Description</Typography>
          <Typography align="justify">{product.description}</Typography>
          <Grid container direction="row" alignItems="center" justify="space-between">
            <ColorSelect getColor={this.getColor} />
            <Typography variant="h5">Amount: </Typography>
            <QuantitySelect quantity={product.quantity} getQuantity={this.getQuantity} />
          </Grid>
        </div>
      </Modal>
    );
  }
}

ProductModal.propTypes = {
  classes: PropTypes.shape().isRequired,
  product: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired
};

export default withStyles(Styles)(ProductModal);
