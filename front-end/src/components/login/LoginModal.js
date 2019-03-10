import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
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
    width: theme.spacing.unit * 70,
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
      openModal: false,
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // must use because showAlert uses this keyword in body
  }

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    this.setState({ email, password });
  };

  render() {
    const { classes } = this.props;
    const { openModal } = this.state;

    return (
      <div>
        <Typography gutterBottom>Please, click below to Log in!</Typography>
        <Button variant="outlined" onClick={this.handleOpen}>
          Log in
        </Button>
        <Modal
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              Log in to the Shop
            </Typography>
            <Form handleSubmit={this.handleSubmit} />
          </div>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  classes: PropTypes.shape().isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const LoginWrapped = withStyles(styles)(LoginModal);

export default LoginWrapped;
