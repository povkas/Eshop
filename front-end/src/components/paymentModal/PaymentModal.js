import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField, Paper, InputLabel } from '@material-ui/core';
import Styles from './Styles';

class PaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, isOpen, handleClose } = this.props;
    return (
      <Modal open={isOpen} onClose={handleClose} className={classes.childrenCentered}>
        <Paper style={{ paddingBottom: '24px', width: 393 }}>
          <form>
            <h1>Payment details</h1>
            <InputLabel>Credit card number</InputLabel>
            <div>
              <TextField required placeholder="XXXX-XXXX-XXXX-XXXX" />
            </div>
            <InputLabel>Expiration date</InputLabel>
            <div>
              <TextField required label="YYYY/MM" />
            </div>
            <InputLabel>Secret number</InputLabel>
            <div>
              <TextField required label="Secret number" />
            </div>
            <Button type="submit">Proceed with payment</Button>
          </form>
        </Paper>
      </Modal>
    );
  }
}

PaymentModal.propTypes = {
  classes: PropTypes.shape().isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(Styles)(PaymentModal);
