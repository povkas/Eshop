import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import { Link, BrowserRouter } from 'react-router-dom';
import Styles from './Styles';
import { LoginForm } from '../login';

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
              BimBam連合
            </Link>
          </Typography>
          <IconButton className={classes.menuButton}>
            <LoginForm />
          </IconButton>

          <IconButton className={classes.menuButton}>
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
    </BrowserRouter>
  );
}

export default withStyles(Styles)(NavBar);
