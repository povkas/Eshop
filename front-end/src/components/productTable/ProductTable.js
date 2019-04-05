import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ProductItem, Filter } from '.';
import * as productActions from '../../actions/productActions';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [],
      productsOnDisplay: [],
      lowerPriceLimit: 0,
      upperPriceLimit: 0,
      date: 'all'
    };

    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    productActions.getProducts().then(res => {
      this.setState({ allProducts: res, productsOnDisplay: res });
    });
  }

  componentDidUpdate() {
    const { upperPriceLimit, lowerPriceLimit, allProducts } = this.state;
    let qualifyingProducts = [];
    if (upperPriceLimit >= lowerPriceLimit && upperPriceLimit > 0 && lowerPriceLimit >= 0) {
      qualifyingProducts = allProducts.filter(this.checkPrice);
    }

    qualifyingProducts = qualifyingProducts.filter(this.checkDate);

    this.setState = { productsOnDisplay: qualifyingProducts };
  }

  changeDate(e) {
    this.setState({ date: e.target.value });
  }

  checkPrice(product) {
    const { upperPriceLimit, lowerPriceLimit } = this.state;
    return product.price <= upperPriceLimit && product.price >= lowerPriceLimit;
  }

  checkDate(product) {
    const { date } = this.state;

    switch (date) {
      case 'day':
        return new Date() - product.date < 86400000;
      case 'week':
        return new Date() - product.date < 86400000 * 7;
      case 'month':
        return new Date() - product.date < 86400000 * 31;
      case 'year':
        return new Date().getFullYear() - product.date.getFullYear() < 1;
      default:
        return true;
    }
  }

  changePrice(lower, upper) {
    this.setState({ lowerPriceLimit: lower, upperPriceLimit: upper });
  }

  render() {
    const { productsOnDisplay, lowerPriceLimit, upperPriceLimit, date } = this.state;
    return (
      <div>
        <Filter
          lowerPriceLimit={lowerPriceLimit}
          upperPriceLimit={upperPriceLimit}
          date={date}
          changeDate={this.changeDate}
        />
        <Grid container justify="space-evenly" alignItems="center">
          {productsOnDisplay.map(product => (
            <ProductItem product={product} key={product.key} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProductTable;
