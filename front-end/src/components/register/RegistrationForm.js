import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Form from './Form';

function getModalPlace() {
  const top = 80;
  const left = 85;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: '80vh'
  };
}

const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 35,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
});

class RegistrationForm extends React.Component {
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
      <div>
        <Button className={className} onClick={this.handleOpen}>
          Sign Up
        </Button>
        <Modal open={openModal} onClose={this.handleClose}>
          <div style={getModalPlace()} className={classes.paper}>
            <Form passClose={this.handleClose} />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
          </div>
        </Modal>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(modalStyles)(RegistrationForm);
