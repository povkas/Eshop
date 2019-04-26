import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Link from '@material-ui/core/Link';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
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
    const { loginUserProp, setError, openSnackbar } = this.props;
    loginUserProp(user, openSnackbar, setError);
  };

  render() {
    const { classes, className, openRegistration } = this.props;
    const { openModal } = this.state;
    const register = "Don't have an account?";

    return (
      <div>
        <IconButton className={className.menuButton} onClick={this.handleOpen}>
          <Person />
        </IconButton>
        <Modal open={openModal} onClose={this.handleClose}>
          <div className={classes.paper}>
            <Form passClose={this.handleClose} onSubmit={this.handleLogin} />

            <Button
              className={classes.button}
              onClick={() => {
                this.handleClose();
                openRegistration();
              }}
            >
              {register}
            </Button>

            <Link className={classes.color} href=" ">
              Forgot password?
            </Link>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.shape().isRequired,
  loginUserProp: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  openRegistration: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    loginUserProp: (user, openSnackbar, setError) =>
      loginUser(user, openSnackbar, setError)(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(LoginForm));
