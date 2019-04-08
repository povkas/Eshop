import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Form from './Form';
import Styles from './Styles';

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
          <div className={classes.paper}>
            <Form passClose={this.handleClose} />
          </div>
        </Modal>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(RegistrationForm);
