import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { isEqual } from 'lodash';
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
      sortCriteria: 'nameDescending',
      sortingCompleted: false,
      all: 'All'
    };

    this._isMounted = false;

    this.changeDate = this.changeDate.bind(this);
    this.changePriceLower = this.changePriceLower.bind(this);
    this.changePriceUpper = this.changePriceUpper.bind(this);
    this.checkPriceUpper = this.checkPriceUpper.bind(this);
    this.checkPriceLower = this.checkPriceLower.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.checkSelectedCategory = this.checkSelectedCategory.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  componentDidMount() {
    getProducts().then(res => {
      this.setState({ allProducts: res, filteredProducts: res });
    });
    this._isMounted = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isModalToggled = !isEqual(this.state, nextState);
    return isModalToggled;
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

  selectCategory = category => {
    this.setState(
      {
        selectedCategory: category
      },
      () => this.filterByCategory()
    );
  };

  filterByCategory = () => {
    const { allProducts, selectedCategory } = this.state;
    let qualifyingProducts = [];
    if (selectedCategory === 'All') {
      qualifyingProducts = allProducts;
    } else {
      qualifyingProducts = allProducts.filter(this.checkSelectedCategory);
    }
    this.setState({ filteredProducts: qualifyingProducts });
    this.setState({ lowerPriceLimit: '' });
    this.setState({ upperPriceLimit: '' });
    this.setState({ sortCriteria: 'nameDescending' });
    this.setState({ date: 'all' });
  };

  changeShownProducts() {
    const { upperPriceLimit, lowerPriceLimit, allProducts, selectedCategory } = this.state;
    const upperPriceLimitFloat = parseFloat(upperPriceLimit);
    const lowerPriceLimitFloat = parseFloat(lowerPriceLimit);

    let qualifyingProducts = [];
    if (selectedCategory === 'All Products') {
      qualifyingProducts = allProducts;
    } else {
      qualifyingProducts = allProducts.filter(this.checkSelectedCategory);
    }

    if (
      upperPriceLimitFloat >= lowerPriceLimitFloat ||
      (Number.isNaN(lowerPriceLimitFloat) && upperPriceLimitFloat > 0)
    ) {
      qualifyingProducts = qualifyingProducts.filter(this.checkPriceUpper);
      this.setState({ upperPriceLimitHelper: '' });
    } else if (upperPriceLimitFloat < lowerPriceLimitFloat) {
      this.setState({ upperPriceLimitHelper: 'Number smaller than lower bound number' });
    } else {
      this.setState({ upperPriceLimitHelper: '' });
    }

    if (lowerPriceLimitFloat >= 0) {
      this.setState({ lowerPriceLimitHelper: '' });
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
    const sortedProducts = filteredProducts;
    sortedProducts.sort(compare);
    this.setState({ filteredProducts: sortedProducts, sortingCompleted: true });
  }

  changeDate(e) {
    this.setState({ date: e.target.value }, () => this.changeShownProducts());
  }

  changePriceLower(e) {
    if (/^([0-9][0-9]*\.?[0-9]?[0-9]?)$/.test(e.target.value)) {
      this.setState({ lowerPriceLimit: e.target.value }, () => this.changeShownProducts());
    } else if (e.target.value === '') {
      this.setState({ lowerPriceLimit: e.target.value }, () => this.changeShownProducts());
    }
  }

  changePriceUpper(e) {
    if (/^([0-9][0-9]*\.?[0-9]?[0-9]?)$/.test(e.target.value)) {
      this.setState({ upperPriceLimit: e.target.value }, () => this.changeShownProducts());
    } else if (e.target.value === '') {
      this.setState({ upperPriceLimit: e.target.value }, () => this.changeShownProducts());
    }
  }

  changeSort(e) {
    this.setState({ sortCriteria: e.target.value, sortingCompleted: false }, () =>
      this.sortShownProducts()
    );
  }

  checkPriceUpper(product) {
    const { upperPriceLimit } = this.state;
    const upperPriceLimitFloat = parseFloat(upperPriceLimit);
    return product.price <= upperPriceLimitFloat;
  }

  checkSelectedCategory(product) {
    const { selectedCategory } = this.state;
    return product.category === selectedCategory || !selectedCategory;
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
      sortCriteria
    } = this.state;

    return (
      <div>
        <NavBar selectCategory={this.selectCategory} />
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
                changePriceLower={this.changePriceLower}
                changePriceUpper={this.changePriceUpper}
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
