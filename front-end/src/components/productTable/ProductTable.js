import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ProductItem from './ProductItem';
import Styles from './Styles';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { productHandler, products, classes } = this.props;

    return (
      <Grid container justify="space-evenly" alignItems="center">
        {products.length === 0 ? (
          <div className={classes.emptyMessage}>There are no products matching this criteria.</div>
        ) : (
          products.map(product => (
            <ProductItem
              product={product}
              key={product.id}
              selectProduct={() => productHandler(product)}
            />
          ))
        )}
      </Grid>
    );
  }
}

ProductTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  productHandler: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default withStyles(Styles)(ProductTable);
