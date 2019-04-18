import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ProductItem from './ProductItem';
import LoadingSpinner from './LoadingSpinner';
import Styles from './Styles';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { productHandler, products, productsLoading, classes } = this.props;

    if (products.length === 0 || productsLoading) {
      return productsLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.emptyMessage}>There are no products matching this criteria.</div>
      );
    }

    return (
      <Grid container justify="space-evenly" alignItems="center">
        {products.map(product => (
          <ProductItem
            product={product}
            key={product.id}
            selectProduct={() => productHandler(product)}
          />
        ))}
      </Grid>
    );
  }
}

ProductTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  productHandler: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  productsLoading: PropTypes.bool.isRequired
};

export default withStyles(Styles)(ProductTable);
