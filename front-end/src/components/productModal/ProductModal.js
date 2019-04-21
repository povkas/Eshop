import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal, Divider, Typography, Grid } from '@material-ui/core';
import Styles, { getModalStyle } from './Styles';
import QuantitySelect from './QuantitySelect';

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      quantity: 1
    };
  }

  getQuantity = quantity => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ quantity });
  };

  render() {
    const { classes, isOpen, handleClose, product } = this.props;
    return (
      <Modal open={isOpen} onClose={handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <img
              src={`data:image/png;base64,${product.image}`}
              alt={product.title}
              className={classes.image}
            />
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item xs={4}>
              <Typography variant="h5">Cost: {product.price}€</Typography>
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
          <Grid container direction="row" alignItems="center" justify="flex-end">
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
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(Styles)(ProductModal);
