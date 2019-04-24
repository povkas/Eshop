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
import { LoginForm, UserOptions } from '../login';
import { logoutUser } from '../../actions/authentication';
import { CategoriesList } from '../categoriesList';
import Search from '../search/Search';
import { RegistrationForm } from '../registration';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = e => {
    e.preventDefault();
    const { logoutUserProp, openSnackbar } = this.props;
    logoutUserProp();
    openSnackbar('logoutSuccess');
  };

  render() {
    const {
      classes,
      auth,
      selectCategory,
      currentCategory,
      openSnackbar,
      products,
      handleSearch,
      productHandler
    } = this.props;
    return (
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <CategoriesList selectCategory={selectCategory} currentCategory={currentCategory} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/" className={classes.shopName}>
                BimBam
              </Link>
            </Typography>
            <RegistrationForm openSnackbar={openSnackbar} />
            <Search
              products={products}
              handleSearch={handleSearch}
              productHandler={productHandler}
            />
            {auth.isAuthenticated ? (
              <UserOptions className={classes} logOut={this.handleLogout} />
            ) : (
              <LoginForm className={classes} openSnackbar={openSnackbar} />
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
  classes: PropTypes.shape().isRequired,
  selectCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
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
