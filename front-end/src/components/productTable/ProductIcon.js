import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Styles from './Styles';

function ProductIcon(props) {
  const { classes, product } = props;
  return (
    <Grid item>
      <Paper className={classes.paper} component="div">
        {/* eslint-disable-next-line no-octal-escape */}
        <img
          src="https://previews.123rf.com/images/burntime555/burntime5551602/burntime555160200242/51593574-shovel-white-flat-simple-vector-icon-on-black-background.jpg"
          alt={product.title}
          className={classes.image}
        />
        <Divider />
        <b>
          {product.title}
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <span className={classes.price}> {product.price}€ </span>
        </b>
      </Paper>
    </Grid>
  );
}

export default withStyles(Styles)(ProductIcon);
