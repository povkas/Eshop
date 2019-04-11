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
import { CategoriesList } from '../DropDownMenu';

function NavBar(props) {
  const { classes, selectedCategory, selectCategory, changeCategory } = props;

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <CategoriesList
            selectedCategory={selectedCategory}
            selectCategory={selectCategory}
            changeCategory={changeCategory}
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
  selectedCategory: PropTypes.shape().isRequired,
  selectCategory: PropTypes.shape().isRequired,
  changeCategory: PropTypes.shape().isRequired
};

export default withStyles(Styles)(NavBar);
