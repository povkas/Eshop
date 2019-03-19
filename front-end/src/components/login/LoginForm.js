import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Link from '@material-ui/core/Link';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Form from './Form';

function getModalPlace() {
  const top = 35;
  const left = 76;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: '30vh'
  };
}

const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 28,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
});

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

  render() {
    const { classes, className } = this.props;
    const { openModal } = this.state;

    return (
      <IconButton className={className.menuButton}>
        <Person onClick={this.handleOpen} />

        {/* FIX place onClick={this.handleOpen} to IconButton */}

        <Modal open={openModal} onClose={this.handleClose}>
          <div style={getModalPlace()} className={classes.paper}>
            <Form passClose={this.handleClose} />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Link href=" ">Don't have an account? Click to register</Link>
            <br />
            <Link href=" ">Forgot password?</Link>
          </div>
        </Modal>
      </IconButton>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(modalStyles)(LoginForm);
