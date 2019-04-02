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
    // this.handleClick = this.handleClick.bind(this);
    this.state = { IsopenModal: false };
  }

  handleOpen = () => {
    this.setState({ IsopenModal: true });
  };

  handleClose = () => {
    this.setState({ IsopenModal: false });
  };

  // handleClick() {
  //   const { openModal } = this.state;
  //   if (!openModal) {
  //     document.addEventListener('click', this.handleOutsideClick, false);
  //   } else {
  //     document.removeEventListener('click', this.handleOutsideClick, false);
  //   }

  //   this.setState(prevState => ({
  //     openModal: !prevState.openModal
  //   }));
  // }

  // handleOutsideClick(e) {
  //   // ignore clicks on the component itself
  //   if (this.node.contains(e.target)) {
  //     return;
  //   }

  //   this.handleClick();
  // }

  render() {
    const { IsopenModal } = this.state;
    const { classes } = this.props;
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

            <IconButton onClick={this.handleOpen} className={classes.menuButton}>
              <ShoppingCart />
            </IconButton>
            <CartModal openModal={IsopenModal} handleClose={this.handleClose} />
          </Toolbar>
        </AppBar>
      </BrowserRouter>
    );
  }
}
export default withStyles(Styles)(NavBar);
