import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, withStyles } from '@material-ui/core';
import MySnackbarContent from './SnackbarContentWrapper';

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class CustomizedSnackbars extends React.PureComponent {
  render() {
    const { classes, error, handleClose } = this.props;
    const { status, message } = error;

    if (!status && !message) {
      return null;
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={status && message && true}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MySnackbarContent
            variant="error"
            className={classes.margin}
            message={status && message ? `${status}: ${message}` : ''}
            onClose={handleClose}
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.shape().isRequired,
  error: PropTypes.shape().isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles2)(CustomizedSnackbars);
