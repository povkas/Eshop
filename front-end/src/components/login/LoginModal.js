import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Form from './Form';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
});

class LoginModal extends React.Component {
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
    const { classes } = this.props;
    const { openModal } = this.state;

    return (
      <div>
        <Button variant="outlined" onClick={this.handleOpen}>
          Log in
        </Button>
        <Modal open={openModal} onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Form />
            <Link href=" ">Sign up</Link>
            <br />
            <Link href=" ">Forgot password?</Link>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(LoginModal);
