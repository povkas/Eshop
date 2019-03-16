import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Link from '@material-ui/core/Link';
import Person from '@material-ui/icons/Person';
import Form from './Form';

function getModalPlace() {
  const top = 28;
  const left = 80;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 20,
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

  // arrows do not need bind(this), they use this. of the outside
  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes } = this.props;
    const { openModal } = this.state;

    return (
      <div>
        <Person onClick={this.handleOpen}>Log in</Person>
        <Modal open={openModal} onClose={this.handleClose}>
          <div style={getModalPlace()} className={classes.paper}>
            <Form passClose={this.handleClose} />
            <Link href=" ">Sign up</Link>
            <br />
            <Link href=" ">Forgot password?</Link>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(modalStyles)(LoginForm);
