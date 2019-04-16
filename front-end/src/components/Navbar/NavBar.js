import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Person } from '@material-ui/icons';
import { Link, BrowserRouter } from 'react-router-dom';
import Styles from './Styles';
import { RegistrationForm } from '../registration';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      registrationResponse: ''
    };
  }

  registrationResponseSuccessful = () => {
    this.setState({ registrationResponse: 'Registration Successful' });
  };

  registrationResponseFailed = () => {
    this.setState({ registrationResponse: 'Email has already been taken' });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open, registrationResponse } = this.state;
    return (
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/" className={classes.shopName}>
                BimBam
              </Link>
            </Typography>

            <RegistrationForm
              Successful={this.registrationResponseSuccessful}
              Failed={this.registrationResponseFailed}
              handleClick={this.handleClick}
            />
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              variant="success"
              open={open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              message={registrationResponse}
            />
            <IconButton className={classes.menuButton}>
              <Person />
            </IconButton>
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
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(NavBar);
