import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Link from '@material-ui/core/Link';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import Form from './Form';
import Styles from './Styles';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleLogin = user => {
    const { loginUserProp } = this.props;
    loginUserProp(user);
  };

  render() {
    const { classes, className } = this.props;
    const { openModal } = this.state;

    return (
      <div>
        <IconButton className={className.menuButton} onClick={this.handleOpen}>
          <Person />
        </IconButton>
        <Modal open={openModal} onClose={this.handleClose}>
          <div className={classes.paper}>
            <Form passClose={this.handleClose} onSubmit={this.handleLogin} />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Link href=" ">Don't have an account? Click to register</Link>
            <br />
            <Link href=" ">Forgot password?</Link>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.shape().isRequired,
  loginUserProp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return { loginUserProp: user => loginUser(user)(dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(LoginForm));
