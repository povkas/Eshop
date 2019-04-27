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

class NavBar extends React.Component {
  handleLogout = e => {
    e.preventDefault();
    const { logoutUserProp, openSnackbar } = this.props;
    logoutUserProp();
    openSnackbar({ message: snackbarMessages.logoutSuccess, variant: 'neutral' });
  };

  render() {
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
      createProduct
    } = this.props;

    return (
      <BrowserRouter>
        <AppBar position="static">
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
                createProduct={createProduct}
              />
            ) : (
              <LoginForm className={classes} openSnackbar={openSnackbar} setError={setError} />
            )}
            <IconButton className={classes.menuButton}>
              <ShoppingCart />
            </IconButton>
          </Toolbar>
        </AppBar>
      </BrowserRouter>
    );
  }
}

NavBar.propTypes = {
  createProduct: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  filterByCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  productHandler: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  auth: PropTypes.shape().isRequired,
  logoutUserProp: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired
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
