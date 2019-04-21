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
import { checkIfDateWithinPeriod } from '../utils/dateFunctions';
import { compareByCriteria } from '../utils/sortFunctions';
import CustomizedSnackbars from '../components/snackbar/CustomSnackbar';

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
      date: '',
      upperPriceLimitHelper: '',
      selectedCategory: '',
      sortCriteria: 'nameDescending',
      error: {}
    };

    this._isMounted = false;
  }

  componentDidMount() {
    getProducts()
      .then(res => {
        this.setState({ allProducts: res, filteredProducts: res }, () => this.sortShownProducts());
      })
      .catch(err => {
        const errors = err.response ? err.response.data : { status: 404, message: 'Unidentified' };
        this.setState({ error: errors });
      });

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setError = err => {
    this.setState({ error: err });
  };

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

  handleSnackbarClose = () => {
    this.setState({ error: {} });
  };

  filterByCategory = category => {
    const { allProducts } = this.state;
    const qualifyingProducts = allProducts.filter(
      product => !category || product.category === category
    );

    this.setState(
      {
        selectedCategory: category,
        filteredProducts: qualifyingProducts,
        lowerPriceLimit: '',
        upperPriceLimit: '',
        sortCriteria: 'nameDescending',
        date: 'all'
      },
      () => this.sortShownProducts()
    );
  };

  changeDate = e => {
    this.setState({ date: e.target.value }, () => this.filterShownProducts());
  };

  changePrice = (name, e) => {
    if (/^([0-9][0-9]*\.?[0-9]?[0-9]?)$/.test(e.target.value) || e.target.value === '') {
      this.setState({ [name]: e.target.value }, () => this.filterShownProducts());
    }
  };

  changeSort = e => {
    this.setState({ sortCriteria: e.target.value }, () => this.sortShownProducts());
  };

  filterShownProducts() {
    const { upperPriceLimit, lowerPriceLimit, allProducts, selectedCategory, date } = this.state;
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
      qualifyingProducts = qualifyingProducts.filter(product =>
        Number.isNaN(upperPriceLimitFloat) ? true : product.price <= upperPriceLimitFloat
      );
    } else if (upperPriceLimitFloat < lowerPriceLimitFloat) {
      this.setState({ upperPriceLimitHelper: 'Number smaller than lower bound number' });
    }

    if (lowerPriceLimitFloat >= 0) {
      qualifyingProducts = qualifyingProducts.filter(
        product => product.price >= lowerPriceLimitFloat
      );
    }
    qualifyingProducts = qualifyingProducts.filter(product =>
      checkIfDateWithinPeriod(product.created, date)
    );
    this.setState({ filteredProducts: qualifyingProducts });
  }

  sortShownProducts() {
    const { sortCriteria, filteredProducts } = this.state;
    this.setState({ filteredProducts: filteredProducts.sort(compareByCriteria(sortCriteria)) });
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
      selectedCategory,
      error
    } = this.state;

    return (
      <div>
        <NavBar
          filterByCategory={this.filterByCategory}
          currentCategory={selectedCategory}
          setError={this.setError}
        />
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
        <CustomizedSnackbars error={error} handleClose={this.handleSnackbarClose} />
      </div>
    );
  }
}

MainBody.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(MainBody);
