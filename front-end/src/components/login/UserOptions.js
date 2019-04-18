import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Person from '@material-ui/icons/Person';

class UserOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: null
    };
  }

  handleClick = event => {
    this.setState({ openMenu: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ openMenu: null });
  };

  render() {
    const { openMenu } = this.state;
    const { className, logOut } = this.props;

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
          onClose={this.handleClose}
        >
          <MenuItem onClick={e => logOut(e)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

UserOptions.propTypes = {
  className: PropTypes.shape().isRequired,
  logOut: PropTypes.func.isRequired
};

export default UserOptions;
