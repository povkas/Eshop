import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { ProductItem, Filter } from '.';
import * as productActions from '../../actions/productActions';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    productActions.getProducts().then(res => {
      this.setState({ products: res });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <Filter />
        <Divider />
        <Grid container justify="space-evenly" alignItems="center">
          {products.map(product => (
            <ProductItem product={product} key={product.key} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProductTable;
