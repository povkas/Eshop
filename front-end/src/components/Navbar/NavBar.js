import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import { Link, BrowserRouter } from 'react-router-dom';
import Styles from './Styles';
import { RegistrationForm } from '../registration';

function NavBar(props) {
  const { classes } = props;
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" className={classes.shopName}>
              BimBam
            </Link>
          </Typography>
          <IconButton className={classes.menuButton}>
            <Person />
          </IconButton>
          <RegistrationForm className={classes} />

          <IconButton className={classes.menuButton}>
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
    </BrowserRouter>
  );
}

export default withStyles(Styles)(NavBar);
