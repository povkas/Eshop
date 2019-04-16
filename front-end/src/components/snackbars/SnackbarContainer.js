import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import wrapStyles from './Styles';

const variantIcon = {
  loginSuccess: CheckCircleIcon,
  loginError: ErrorIcon,
  logoutSuccess: ErrorIcon
};

const variantMessage = {
  loginSuccess: 'Login successful!',
  loginError: 'Incorrect email or password!',
  logoutSuccess: 'Logout successful!'
};

function SnackContent(props) {
  const { classes, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  const Message = variantMessage[variant];

  return (
    <SnackbarContent
      className={classes[variant]}
      message={[
        <span className={classes.message} key={classes.message}>
          <Icon className={classes.iconVariant} />
          {Message}
        </span>
      ]}
      action={[
        <IconButton key="close" color="inherit" className={classes.close} onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

SnackContent.propTypes = {
  classes: PropTypes.shape().isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['loginSuccess', 'loginError', 'logoutSuccess']).isRequired
};

const SnackbarContentWrapper = withStyles(wrapStyles)(SnackContent);

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
      <SnackbarContentWrapper onClose={closeSnackbar} variant={variant} />
    </Snackbar>
  );
}

SnackbarContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
};

export default SnackbarContainer;
