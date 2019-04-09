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
import CartModal from '../Cart/CartModal';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    // if (reason === 'clickaway') {
    //   return;
    // event, reason
    // }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
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

            <IconButton className={classes.menuButton} onClick={this.handleClick}>
              <ShoppingCart />
            </IconButton>
            <CartModal onClick={this.handleClose} open={open} />
          </Toolbar>
        </AppBar>
      </BrowserRouter>
    );
  }
}

export default withStyles(Styles)(NavBar);
