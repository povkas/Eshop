import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ProductModal from '../../components/productModal/ProductModal';
import ProductTable from '../../components/productTable/ProductTable';
import { getProducts } from '../../actions/productActions';
import { Filter, Sort } from '../../components/productFilter';
import Styles from './Styles';
import { NavBar } from '../navbar';
import { checkIfDateWithinPeriod } from '../../utils/dateFunctions';
import { compareByCriteria } from '../../utils/sortFunctions';
import { SnackbarContainer } from '../../components/snackbar';
import { snackbarMessages } from '../../utils/constants';
import { PaymentModal } from '../../components/paymentModal';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentModalOpen: false,
      selectedProduct: {},
      allProducts: [],
      filteredProducts: [],
      lowerPriceLimit: '',
      upperPriceLimit: '',
      date: '',
      upperPriceLimitHelper: '',
      selectedCategory: '',
      cartProducts: [],
      sortCriteria: 'nameDescending',
      productsLoading: false,
      snackbarContents: {},
      numberOfProducts: 12
    };

    this._isMounted = false;
    this.turnOffLeftArrow = this.turnOffLeftArrow.bind(this);
    this.turnOffRightArrow = this.turnOffRightArrow.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  componentDidMount() {
    this.setState({ productsLoading: true }, () => {
      getProducts()
        .then(res => {
          const productArray = this.checkAllPorducts(res);
          this.setState(
            { allProducts: productArray, filteredProducts: productArray, productsLoading: false },
            () => this.sortShownProducts()
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

  RemoveAllProducts = () => {
    this.setState({ cartProducts: [] });
  };

  changeQuantity = (id, type) => {
    const { cartProducts } = this.state;
    const oldProduct = cartProducts[id];
    let newProduct = null;
    switch (type) {
      case 'Increment':
        newProduct = {
          ...oldProduct,
          selectedQuantity: oldProduct.selectedQuantity + 1
        };
        break;
      case 'Decrement':
        newProduct = {
          ...oldProduct,
          selectedQuantity: oldProduct.selectedQuantity - 1
        };
        break;
      default:
        newProduct = oldProduct;
        return;
    }
    const newCartProducts = cartProducts.map(p => {
      if (p === oldProduct) {
        return newProduct;
      }
      return p;
    });

    this.setState({ cartProducts: newCartProducts });
  };

  handlePaymentModalClose = () => {
    this.setState({ isPaymentModalOpen: false });
  };

  handlePaymentModalOpen = () => {
    this.setState({ isPaymentModalOpen: true });
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

  checkAllPorducts = productArray => {
    const array = [];
    productArray.forEach(product => (product.quantity > 0 ? array.push(product) : null));
    return array;
  };

  removeFromCart(removeProduct) {
    this.setState(prevState => ({
      cartProducts: prevState.cartProducts.filter(item => item !== removeProduct)
    }));
  }

  rerender() {
    this.setState({ productsLoading: true }, () => {
      getProducts()
        .then(res => {
          const productArray = this.checkAllPorducts(res);
          this.setState(
            { allProducts: productArray, filteredProducts: productArray, productsLoading: false },
            () => this.sortShownProducts()
          );
        })
        .catch(err => {
          this.setError(err);
        });
    });
  }

  addToCart(product) {
    const { cartProducts } = this.state;
    let updated = false;

    const updatedCartProducts = (cartProducts || []).map(cp => {
      if (cp.id === product.id) {
        updated = true;
        if (product.selectedQuantity + cp.selectedQuantity <= cp.quantity) {
          this.openSnackbar({ message: snackbarMessages.addToCartSuccess, variant: 'success' });
          return {
            ...cp,
            selectedQuantity: cp.selectedQuantity + product.selectedQuantity
          };
        }
        this.openSnackbar({ message: snackbarMessages.addToCartError, variant: 'error' });
      }
      return cp;
    });
    this.setState({ cartProducts: updatedCartProducts });

    if (!updated) {
      this.setState({ cartProducts: [...cartProducts, product] });
      this.openSnackbar({ message: snackbarMessages.addToCartSuccess, variant: 'success' });
    }
  }

  turnOffRightArrow(id) {
    const { cartProducts } = this.state;
    const product = cartProducts.find(a => a.id === id);
    if (product.quantity > product.selectedQuantity) {
      return false;
    }
    return true;
  }

  turnOffLeftArrow(id) {
    const { cartProducts } = this.state;
    if (cartProducts.find(a => a.id === id).selectedQuantity <= 1) {
      return true;
    }
    return false;
  }

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
      cartProducts,
      snackbarContents,
      allProducts,
      productsLoading,
      numberOfProducts,
      isPaymentModalOpen
    } = this.state;

    return (
      <div id="mainBody">
        <NavBar
          filterByCategory={this.filterByCategory}
          currentCategory={selectedCategory}
          setError={this.setError}
          products={allProducts}
          handleSearch={this.handleSearch}
          productHandler={this.changeProduct}
          openSnackbar={this.openSnackbar}
          openPaymentDetailsModal={this.handlePaymentModalOpen}
          cartProducts={cartProducts}
          removeFromCart={product => this.removeFromCart(product)}
          RemoveAllProducts={this.RemoveAllProducts}
          turnOffLeftArrow={this.turnOffLeftArrow}
          turnOffRightArrow={this.turnOffRightArrow}
          changeQuantity={this.changeQuantity}
          closeCartModal={this.closeCartModal}
        />
        <ProductModal
          product={selectedProduct}
          handleClose={this.handleModalClose}
          addToCart={this.addToCart}
          openSnackbar={this.openSnackbar}
        />
        <PaymentModal
          isOpen={isPaymentModalOpen}
          handleClose={this.handlePaymentModalClose}
          products={cartProducts}
          RemoveAllProducts={this.RemoveAllProducts}
          rerender={this.rerender}
          openSnackbar={this.openSnackbar}
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
