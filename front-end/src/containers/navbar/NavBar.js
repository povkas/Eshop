import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link, BrowserRouter } from 'react-router-dom';
import Styles from './Styles';
import { LoginForm, UserOptions } from '../../components/login';
import { logoutUser } from '../../actions/authentication';
import { CategoriesList } from '../../components/categoriesList';
import Search from '../../components/search/Search';
import { snackbarMessages } from '../../utils/constants';
import { CartModal } from '../../components/shoppingCart';
import { RegistrationForm } from '../../components/registration';
// import { ProductModal } from '../../components/productModal';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpenRegistrationModal: false, openModal: false };
  }

  handleRegistrationOpen = () => {
    this.setState({ isOpenRegistrationModal: true });
  };

  handleRegistrationClose = () => {
    this.setState({ isOpenRegistrationModal: false });
  };

  handleLogout = e => {
    e.preventDefault();
    const { logoutUserProp, openSnackbar } = this.props;
    logoutUserProp();
    openSnackbar({ message: snackbarMessages.logoutSuccess, variant: 'neutral' });
  };

  handleClick = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { isOpenRegistrationModal, openModal } = this.state;
    const {
      classes,
      auth,
      currentCategory,
      openSnackbar,
      products,
      handleSearch,
      productHandler,
      filterByCategory,
      setError,
      cartProducts,
      RemoveAllProducts,
      removeFromCart,
      turnOffLeftArrow,
      turnOffRightArrow,
      changeQuantity
    } = this.props;
    return (
      <BrowserRouter>
        <AppBar position="sticky">
          <Toolbar>
            <CategoriesList
              filterByCategory={filterByCategory}
              currentCategory={currentCategory}
              setError={setError}
            />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/" className={classes.shopName}>
                BimBam
              </Link>
            </Typography>
            <Search
              products={products}
              handleSearch={handleSearch}
              productHandler={productHandler}
            />
            {auth.isAuthenticated ? (
              <UserOptions
                IsAdmin={auth.user.IsAdmin === 'True'}
                className={classes}
                logOut={this.handleLogout}
                openSnackbar={openSnackbar}
                setError={setError}
              />
            ) : (
              <LoginForm
                className={classes}
                openRegistration={this.handleRegistrationOpen}
                openSnackbar={openSnackbar}
                setError={setError}
              />
            )}
            <RegistrationForm
              closeRegistration={this.handleRegistrationClose}
              openRegistration={this.handleRegistrationOpen}
              openSnackbar={openSnackbar}
              isOpenRegistrationModal={isOpenRegistrationModal}
              setError={setError}
            />
            <IconButton className={classes.menuButton} onClick={this.handleClick}>
              <ShoppingCart />
            </IconButton>
            <CartModal
              onClick={this.handleClose}
              open={openModal}
              openSnackbar={openSnackbar}
              cartProducts={cartProducts}
              removeFromCart={removeFromCart}
              RemoveAllProducts={RemoveAllProducts}
              turnOffLeftArrow={turnOffLeftArrow}
              turnOffRightArrow={turnOffRightArrow}
              changeQuantity={changeQuantity}
            />
          </Toolbar>
        </AppBar>
      </BrowserRouter>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  filterByCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  productHandler: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  auth: PropTypes.shape().isRequired,
  logoutUserProp: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  turnOffLeftArrow: PropTypes.func.isRequired,
  RemoveAllProducts: PropTypes.func.isRequired,
  turnOffRightArrow: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return { logoutUserProp: () => logoutUser(dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(NavBar));
