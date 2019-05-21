import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Person from '@material-ui/icons/Person';
import { ProductForm } from '../productForm';
import { UserList } from '../deleteUsers';

class UserOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: null,
      openProductForm: false,
      openUsersList: false
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

  closeFormModal = () => {
    this.setState({ openProductForm: false });
  };

  openUsersModal = () => {
    this.closeMenu();
    this.setState({ openUsersList: true });
  };

  closeModal = () => {
    this.setState({ openUsersList: false });
  };

  render() {
    const { openMenu, openProductForm, openUsersList } = this.state;
    const { className, logOut, IsAdmin, createProduct, openSnackbar, setError } = this.props;

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
          {IsAdmin ? <MenuItem onClick={this.openUsersModal}>Delete Users</MenuItem> : null}
          {IsAdmin ? <MenuItem onClick={this.openProductForm}>Add Product</MenuItem> : null}
          <MenuItem onClick={e => logOut(e)}>Logout</MenuItem>
        </Menu>
        {IsAdmin ? (
          <UserList
            open={openUsersList}
            closeModal={this.closeModal}
            openModal={this.openUsersModal}
            openSnackbar={openSnackbar}
            setError={setError}
          />
        ) : null}
        {IsAdmin ? (
          <ProductForm
            open={openProductForm}
            close={this.closeFormModal}
            createProduct={createProduct}
            openSnackbar={openSnackbar}
            setError={setError}
          />
        ) : null}
      </div>
    );
  }
}

UserOptions.propTypes = {
  createProduct: PropTypes.func.isRequired,
  className: PropTypes.shape().isRequired,
  logOut: PropTypes.func.isRequired,
  IsAdmin: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired
};

export default UserOptions;
