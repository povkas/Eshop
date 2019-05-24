import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Styles from './Styles';
import { snackbarMessages } from '../../utils/constants';

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      handleCloseAlertDialog,
      RemoveAllProducts,
      openAlertdialog,
      openSnackbar,
      onClick,
      closeModal
    } = this.props;
    return (
      <div>
        <Dialog
          open={openAlertdialog}
          onClose={() => onClick()}
          className={(classes.AlertDialog, classes.alertFont)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you are sure?</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => handleCloseAlertDialog()}
              color="primary"
              className={classes.alertDialogButtons}
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                RemoveAllProducts();
                handleCloseAlertDialog();
                closeModal();
                openSnackbar({
                  message: snackbarMessages.removeAllFromCartSuccess,
                  variant: 'success'
                });
              }}
              className={classes.alertDialogButtons}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  classes: PropTypes.shape().isRequired,
  RemoveAllProducts: PropTypes.func.isRequired,
  openAlertdialog: PropTypes.bool.isRequired,
  handleCloseAlertDialog: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default withStyles(Styles)(AlertDialog);
