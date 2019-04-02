import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ProductItem } from '.';
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
        <Grid container justify="space-evenly" alignItems="center">
          {products.map(product => (
            <ProductItem product={product} key={product.id} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProductTable;
