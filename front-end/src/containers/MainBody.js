import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ProductModal from '../components/productModal/ProductModal';
import ProductTable from '../components/productTable/ProductTable';
import { getProducts } from '../actions/productActions';
import { Filter, Sort } from '../components/productTable';
import Styles from './Styles';
import { NavBar } from '../components/Navbar';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductModalOpen: false,
      selectedProduct: {},
      allProducts: [],
      filteredProducts: [],
      lowerPriceLimit: '',
      upperPriceLimit: '',
      date: 'all',
      upperPriceLimitHelper: '',
      selectedCategory: '',
      sortCriteria: 'nameDescending'
    };

    this._isMounted = false;

    this.checkPriceUpper = this.checkPriceUpper.bind(this);
    this.checkPriceLower = this.checkPriceLower.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  componentDidMount() {
    getProducts().then(res => {
      this.setState({ allProducts: res, filteredProducts: res });
    });
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  changeProduct = product => {
    if (this._isMounted === true) {
      this.setState({
        selectedProduct: product,
        isProductModalOpen: true
      });
    }
  };

  handleClose = () => {
    this.setState({ isProductModalOpen: false });
  };

  handleOpen = () => {
    if (this._isMounted === true) {
      this.setState({ isProductModalOpen: true });
    }
  };

  filterByCategory = category => {
    const { allProducts } = this.state;

    const qualifyingProducts = allProducts.filter(
      product => !category || product.category === category
    );

    this.setState({
      selectedCategory: category,
      filteredProducts: qualifyingProducts,
      lowerPriceLimit: '',
      upperPriceLimit: '',
      sortCriteria: 'nameDescending',
      date: 'all'
    });
  };

  changeDate = e => {
    this.setState({ date: e.target.value }, () => this.changeShownProducts());
  };

  changePrice = (name, e) => {
    if (/^([0-9][0-9]*\.?[0-9]?[0-9]?)$/.test(e.target.value) || e.target.value === '') {
      this.setState({ [name]: e.target.value }, () => this.changeShownProducts());
    }
  };

  changeShownProducts() {
    const { upperPriceLimit, lowerPriceLimit, allProducts, selectedCategory } = this.state;
    const upperPriceLimitFloat = parseFloat(upperPriceLimit);
    const lowerPriceLimitFloat = parseFloat(lowerPriceLimit);

    let qualifyingProducts = allProducts.filter(
      product => !selectedCategory || product.category === selectedCategory
    );

    this.setState({ upperPriceLimitHelper: '' });

    if (
      upperPriceLimitFloat >= lowerPriceLimitFloat ||
      (Number.isNaN(lowerPriceLimitFloat) && upperPriceLimitFloat > 0)
    ) {
      qualifyingProducts = qualifyingProducts.filter(this.checkPriceUpper);
    } else if (upperPriceLimitFloat < lowerPriceLimitFloat) {
      this.setState({ upperPriceLimitHelper: 'Number smaller than lower bound number' });
    }

    if (lowerPriceLimitFloat >= 0) {
      qualifyingProducts = qualifyingProducts.filter(this.checkPriceLower);
    }
    qualifyingProducts = qualifyingProducts.filter(this.checkDate);
    this.setState({ filteredProducts: qualifyingProducts });
  }

  sortShownProducts() {
    const { sortCriteria, filteredProducts } = this.state;
    let compare;
    switch (sortCriteria) {
      default:
        compare = (a, b) => {
          if (a.title > b.title) return 1;
          if (b.title > a.title) return -1;
          return 0;
        };
        break;
      case 'nameAscending':
        compare = (a, b) => {
          if (a.title > b.title) return -1;
          if (b.title > a.title) return 1;
          return 0;
        };
        break;
      case 'priceDescending':
        compare = (a, b) => {
          return b.price - a.price;
        };
        break;
      case 'priceAscending':
        compare = (a, b) => {
          return a.price - b.price;
        };
        break;
      case 'dateAscending':
        compare = (a, b) => {
          if (a.created > b.created) return -1;
          if (b.created > a.created) return 1;
          return 0;
        };
        break;
      case 'dateDescending':
        compare = (a, b) => {
          if (a.created > b.created) return 1;
          if (b.created > a.created) return -1;
          return 0;
        };
        break;
    }

    this.setState({ filteredProducts: filteredProducts.sort(compare) });
  }

  changeSort(e) {
    this.setState({ sortCriteria: e.target.value }, () => this.sortShownProducts());
  }

  checkPriceUpper(product) {
    const { upperPriceLimit } = this.state;
    const upperPriceLimitFloat = parseFloat(upperPriceLimit);
    return Number.isNaN(upperPriceLimitFloat) ? true : product.price <= upperPriceLimitFloat;
  }

  checkPriceLower(product) {
    const { lowerPriceLimit } = this.state;
    const lowerPriceLimitFloat = parseFloat(lowerPriceLimit);
    return product.price >= lowerPriceLimitFloat;
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
    const { classes } = this.props;
    const {
      isProductModalOpen,
      selectedProduct,
      filteredProducts,
      lowerPriceLimit,
      upperPriceLimit,
      date,
      upperPriceLimitHelper,
      sortCriteria,
      selectedCategory
    } = this.state;

    return (
      <div>
        <NavBar filterByCategory={this.filterByCategory} currentCategory={selectedCategory} />
        <ProductModal
          openModal={isProductModalOpen}
          handleClose={this.handleClose}
          product={selectedProduct}
        />
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Grid item>
            <Paper className={classes.paper} elevation={24}>
              <Filter
                lowerPriceLimit={lowerPriceLimit}
                upperPriceLimit={upperPriceLimit}
                date={date}
                changeDate={this.changeDate}
                changePrice={this.changePrice}
                upperPriceLimitHelper={upperPriceLimitHelper}
              />
              <Sort sortCriteria={sortCriteria} changeSort={this.changeSort} />
              <BrowserRouter>
                <Route
                  path="/"
                  component={() => (
                    <ProductTable
                      openProduct={this.handleOpen}
                      productHandler={this.changeProduct}
                      products={filteredProducts}
                    />
                  )}
                />
              </BrowserRouter>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainBody.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(MainBody);
