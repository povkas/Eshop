import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
// import Person from '@material-ui/icons/Person';
import { Link, BrowserRouter } from 'react-router-dom';
import Styles from './Styles';
import { LoginForm, UserOptions } from '../login';
import { logoutUser } from '../../actions/authentication';

class NavBar extends React.Component {
  handleLogout = e => {
    e.preventDefault();
    const { logoutUserProp } = this.props;
    logoutUserProp();
  };

  render() {
    const { classes, auth } = this.props;
    let logOut;
    if (auth.isAuthenticated) {
      logOut = (
        // <IconButton className={classes.menuButton} onClick={this.handleLogout}>
        //   <Person />
        // </IconButton>
        <UserOptions className={classes} logOut={this.handleLogout} />
      );
    }
    return (
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/" className={classes.shopName}>
                BimBam連合
              </Link>
            </Typography>
            {auth.isAuthenticated ? logOut : <LoginForm className={classes} />}
            <IconButton className={classes.menuButton}>
              <ShoppingCart />
            </IconButton>
          </Toolbar>
        </AppBar>
      </BrowserRouter>
    );
  }
}

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
