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
import Search from '../search/Search';
import { CategoriesList } from '../categoriesList';

function NavBar(props) {
  const {
    classes,
    selectCategory,
    currentCategory,
    products,
    handleSearch,
    productHandler
  } = props;

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
          <Search products={products} handleSearch={handleSearch} productHandler={productHandler} />
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
  selectCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  productHandler: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default withStyles(Styles)(NavBar);
