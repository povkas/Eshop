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
    this.changePriceLower = this.changePriceLower.bind(this);
    this.changePriceUpper = this.changePriceUpper.bind(this);
    this.checkPriceUpper = this.checkPriceUpper.bind(this);
    this.checkPriceLower = this.checkPriceLower.bind(this);
    this.checkDate = this.checkDate.bind(this);
  }

  componentDidMount() {
    productActions.getProducts().then(res => {
      this.setState({ allProducts: res, productsOnDisplay: res });
    });
  }

  changeShownProducts() {
    const { upperPriceLimit, lowerPriceLimit, allProducts } = this.state;
    let qualifyingProducts = [];
    if (upperPriceLimit >= lowerPriceLimit && upperPriceLimit > 0)
      qualifyingProducts = allProducts.filter(this.checkPriceUpper);
    else qualifyingProducts = allProducts;
    if (lowerPriceLimit >= 0) qualifyingProducts = allProducts.filter(this.checkPriceLower);
    else qualifyingProducts = allProducts;

    qualifyingProducts = qualifyingProducts.filter(this.checkDate);
    this.setState({ productsOnDisplay: qualifyingProducts });
  }

  changeDate(e) {
    this.setState({ date: e.target.value }, () => this.changeShownProducts());
  }

  changePriceLower(e) {
    this.setState({ lowerPriceLimit: parseFloat(e.target.value) }, () =>
      this.changeShownProducts()
    );
  }

  changePriceUpper(e) {
    this.setState({ upperPriceLimit: parseFloat(e.target.value) }, () =>
      this.changeShownProducts()
    );
  }

  checkPriceUpper(product) {
    const { upperPriceLimit } = this.state;
    return product.price <= upperPriceLimit;
  }

  checkPriceLower(product) {
    const { lowerPriceLimit } = this.state;
    return product.price >= lowerPriceLimit;
  }

  checkDate(product) {
    const { date } = this.state;
    let dateFromDatabase = product.created;
    dateFromDatabase = dateFromDatabase.replace(/:| /g, '-');
    dateFromDatabase = dateFromDatabase.replace('T', '-');
    const YMDhms = dateFromDatabase.split('-');
    const correctDate = new Date();
    const radix = 10;
    correctDate.setFullYear(
      parseInt(YMDhms[0], radix),
      parseInt(YMDhms[1], radix) - 1,
      parseInt(YMDhms[2], radix)
    );
    correctDate.setHours(
      parseInt(YMDhms[3], radix),
      parseInt(YMDhms[4], radix),
      parseInt(YMDhms[5], radix),
      0
    );

    switch (date) {
      case 'day':
        return new Date() - correctDate < 86400000;
      case 'week':
        return new Date() - correctDate < 86400000 * 7;
      case 'month':
        return new Date() - correctDate < 86400000 * 31;
      case 'year':
        return new Date().getFullYear() - correctDate.getFullYear() < 1;
      default:
        return true;
    }
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
          changePriceLower={this.changePriceLower}
          changePriceUpper={this.changePriceUpper}
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
