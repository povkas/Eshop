import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import green from '@material-ui/core/colors/green';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  loginError: ErrorIcon
};

const variantMessage = {
  success: 'Login successful!',
  error: 'Logout successful!',
  loginError: 'Incorrect email or password!'
};

const stylesWrap = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: blue[600]
  },
  loginError: {
    backgroundColor: theme.palette.error.dark
  },
  iconVariant: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

function MySnackbarContent(props) {
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

MySnackbarContent.propTypes = {
  classes: PropTypes.shape().isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'error']).isRequired
};

const MySnackbarContentWrapper = withStyles(stylesWrap)(MySnackbarContent);

// eslint-disable-next-line react/prefer-stateless-function
class SnackbarContainer extends React.Component {
  render() {
    const { open, closeSnackbar, variant } = this.props;
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
        <MySnackbarContentWrapper onClose={closeSnackbar} variant={variant} />
      </Snackbar>
    );
  }
}

SnackbarContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
};

export default SnackbarContainer;
