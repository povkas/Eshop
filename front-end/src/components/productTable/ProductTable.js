import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductItem from './ProductItem';
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

  // idUpdate = id => {
  //   const { idSelected } = this.props;
  //   idSelected(id);
  //   console.log(`idUpdateTable id=${id}`);
  // };

  // idUpdate = product => {
  //   const { idSelected, openProduct } = this.props;
  //   idSelected(product);
  //   openProduct();
  //   console.log(`idUpdateTable id=${product}`);
  // };

  render() {
    const { products } = this.state;
    const { idSelected } = this.props;
    // const { openProduct } = this.props;

    return (
      <div>
        <Grid container justify="space-evenly" alignItems="center">
          {products.map(product => (
            <ProductItem
              product={product}
              key={product.id}
              // handleModalOpen={openProduct}
              selectProduct={() => idSelected(product)}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProductTable;
