import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from './SnackbarContent';

function SnackbarContainer(props) {
  const { open, closeSnackbar, variant } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackbar}
    >
      <SnackbarContent onClose={closeSnackbar} variant={variant} />
    </Snackbar>
  );
}

SnackbarContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
};

export default SnackbarContainer;
