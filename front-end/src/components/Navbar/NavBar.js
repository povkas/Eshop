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

class NavBar extends React.Component {
  handleLogout = e => {
    e.preventDefault();
    const { logoutUserProp, openSnackbar } = this.props;
    logoutUserProp();
    openSnackbar('logoutSuccess');
  };

  render() {
    const { classes, auth, selectCategory, currentCategory, openSnackbar } = this.props;
    return (
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <CategoriesList selectCategory={selectCategory} currentCategory={currentCategory} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/" className={classes.shopName}>
                BimBam連合
              </Link>
            </Typography>
            {auth.isAuthenticated ? (
              <UserOptions
                className={classes}
                logOut={this.handleLogout}
                openSnackbar={openSnackbar}
              />
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
