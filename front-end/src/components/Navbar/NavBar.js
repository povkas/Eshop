import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Person } from '@material-ui/icons';
import { Link, BrowserRouter } from 'react-router-dom';
import Styles from './Styles';
import { CategoriesList } from '../categoriesList';

function NavBar(props) {
  const { classes, filterByCategory, currentCategory, setError } = props;

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

NavBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  filterByCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
};

export default withStyles(Styles)(NavBar);
