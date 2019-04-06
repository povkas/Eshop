import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ProductItem from './ProductItem';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { productHandler, products } = this.props;

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
  productHandler: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default ProductTable;
