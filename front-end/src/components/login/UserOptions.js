import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Person from '@material-ui/icons/Person';
import { ProductForm } from '../productForm';

class UserOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: null,
      openProductForm: false
    };
  }

  handleClick = event => {
    this.setState({ openMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ openMenu: null });
  };

  openProductForm = () => {
    this.closeMenu();
    this.setState({ openProductForm: true });
  };

  closeModal = () => {
    this.setState({ openProductForm: false });
  };

  render() {
    const { openMenu, openProductForm } = this.state;
    const { className, logOut, IsAdmin } = this.props;

    return (
      <div>
        <IconButton
          className={className.menuButton}
          aria-owns={openMenu ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Person />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={openMenu}
          open={Boolean(openMenu)}
          onClose={this.closeMenu}
        >
          {IsAdmin ? <MenuItem onClick={this.openProductForm}>Add Product</MenuItem> : null}
          <MenuItem onClick={e => logOut(e)}>Logout</MenuItem>
        </Menu>
        {IsAdmin ? <ProductForm open={openProductForm} close={this.closeModal} /> : null}
      </div>
    );
  }
}

UserOptions.propTypes = {
  className: PropTypes.shape().isRequired,
  logOut: PropTypes.func.isRequired,
  IsAdmin: PropTypes.bool.isRequired
};

export default UserOptions;
