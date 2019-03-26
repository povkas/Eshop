import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Styles from './Styles';

function ProductItem(props) {
  const { classes, product } = props;
  return (
    <Grid item>
      <Paper className={classes.paper} component="div">
        <img
          src={`data:image/png;base64,${product.image}`}
          alt={product.title}
          className={classes.image}
        />
        <Divider />
        <b>
          {product.title}
          <span className={classes.price}>{product.price}€</span>
        </b>
      </Paper>
    </Grid>
  );
}

export default withStyles(Styles)(ProductItem);
