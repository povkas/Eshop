import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Styles';

function LoadingSpinner(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} size={15} /> Loading...
    </div>
  );
}

LoadingSpinner.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(LoadingSpinner);
