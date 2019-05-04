import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ProductModal from '../../components/productModal/ProductModal';
import ProductTable from '../../components/productTable/ProductTable';
import { getProducts } from '../../actions/productActions';
import { Filter, Sort } from '../../components/productTable';
import Styles from './Styles';
import { NavBar } from '../navbar';
import { checkIfDateWithinPeriod } from '../../utils/dateFunctions';
import { compareByCriteria } from '../../utils/sortFunctions';
import { SnackbarContainer } from '../../components/snackbar';
import { snackbarMessages } from '../../utils/constants';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      allProducts: [],
      filteredProducts: [],
      lowerPriceLimit: '',
      upperPriceLimit: '',
      date: '',
      upperPriceLimitHelper: '',
      selectedCategory: '',
      sortCriteria: 'nameDescending',
      productsLoading: false,
      snackbarContents: {},
      numberOfProducts: 12
    };

    this._isMounted = false;

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.setState({ productsLoading: true }, () => {
      getProducts()
        .then(res => {
          this.setState({ allProducts: res, filteredProducts: res, productsLoading: false }, () =>
            this.sortShownProducts()
          );
        })
        .catch(err => {
          this.setError(err);
        });
    });

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setError = err => {
    this.setState({ productsLoading: false });
    const errors = err.response
      ? { message: `${err.response.status} : ${err.response.data.Message}` }
      : { message: snackbarMessages.unidentified };
    this.setState({ snackbarContents: { message: errors.message, variant: 'error' } });
  };

  changeProduct = product => {
    if (this._isMounted === true) {
      this.setState({
        selectedProduct: product
      });
    }
  };

  handleModalClose = () => {
    this.setState({ selectedProduct: {} });
  };

  openSnackbar = snackbarContents => {
    this.setState({ snackbarContents });
  };

  handleSnackbarClose = () => {
    const { snackbarContents } = this.state;
    this.setState({ snackbarContents: { ...snackbarContents, message: undefined } });
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

  changeNumberOfProducts = e => {
    this.setState({ numberOfProducts: e.target.value });
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

  handleSearch(products) {
    this.setState({ filteredProducts: products }, () => this.selectCategory('search'));
  }

  sortShownProducts() {
    const { sortCriteria, filteredProducts } = this.state;
    this.setState({ filteredProducts: filteredProducts.sort(compareByCriteria(sortCriteria)) });
  }

  render() {
    const { classes } = this.props;
    const {
      selectedProduct,
      filteredProducts,
      lowerPriceLimit,
      upperPriceLimit,
      date,
      upperPriceLimitHelper,
      sortCriteria,
      selectedCategory,
      snackbarContents,
      allProducts,
      productsLoading,
      numberOfProducts
    } = this.state;

    return (
      <div>
        <NavBar
          filterByCategory={this.filterByCategory}
          currentCategory={selectedCategory}
          setError={this.setError}
          products={allProducts}
          handleSearch={this.handleSearch}
          productHandler={this.changeProduct}
          openSnackbar={this.openSnackbar}
        />
        <ProductModal product={selectedProduct} handleClose={this.handleModalClose} />
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
              <Sort
                sortCriteria={sortCriteria}
                changeSort={this.changeSort}
                numberOfProducts={numberOfProducts}
                changeNumberOfProducts={this.changeNumberOfProducts}
              />
              <BrowserRouter>
                <Route
                  path="/"
                  component={() => (
                    <ProductTable
                      openProduct={this.handleOpen}
                      productHandler={this.changeProduct}
                      products={filteredProducts}
                      productsLoading={productsLoading}
                      numberOfProducts={numberOfProducts}
                    />
                  )}
                />
              </BrowserRouter>
            </Paper>
          </Grid>
        </Grid>
        <SnackbarContainer
          snackbarContents={snackbarContents}
          handleClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

MainBody.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(MainBody);
