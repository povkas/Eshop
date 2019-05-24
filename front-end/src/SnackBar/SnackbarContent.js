import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Styles from './styles';
import { snackbarMessages } from '../utils/constants';

const variantIcon = {
  addToCartSuccess: CheckCircleIcon,
  loginSuccess: CheckCircleIcon,
  loginError: ErrorIcon,
  logoutSuccess: ErrorIcon,
  addToCartError: ErrorIcon
};

function SnackContent(props) {
  const { classes, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  const Message = snackbarMessages[variant];

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
  variant: PropTypes.oneOf([
    'addToCartSuccess',
    'loginSuccess',
    'loginError',
    'logoutSuccess',
    'addToCartError'
  ]).isRequired
};

export default withStyles(Styles)(SnackContent);
