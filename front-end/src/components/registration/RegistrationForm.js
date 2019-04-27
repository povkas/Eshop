import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from './Form';
import Styles from './Styles';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      openSnackbar,
      closeRegistration,
      isOpenRegistrationModal,
      setError
    } = this.props;
    return (
      <div>
        <Modal open={isOpenRegistrationModal} onClose={closeRegistration}>
          <div className={classes.paper}>
            <Form setError={setError} passClose={closeRegistration} openSnackbar={openSnackbar} />
          </div>
        </Modal>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  openSnackbar: PropTypes.func.isRequired,
  closeRegistration: PropTypes.func.isRequired,
  isOpenRegistrationModal: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired
};

export default withStyles(Styles)(RegistrationForm);
