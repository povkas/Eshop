import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
});

class Login extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Typography gutterBottom>Please, click below to Log in!</Typography>
        <Button variant="outlined" onClick={this.handleOpen}>
          Log in
        </Button>
        <Modal aria-describedby="simple-modal-description" open={open} onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              Log in to the Shop
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button variant="outlined" onClick={this.handleClose}>
              Log in
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape().isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const LoginWrapped = withStyles(styles)(Login);

export default LoginWrapped;
