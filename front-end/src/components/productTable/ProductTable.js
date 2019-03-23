import React from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import { ProductIcon } from '.';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/products').then(res => {
      this.setState({ products: res.data });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <Grid container justify="space-evenly" alignItems="center">
          {products.map(product => (
            <ProductIcon product={product} key={product.key} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProductTable;
