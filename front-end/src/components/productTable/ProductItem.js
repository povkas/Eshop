import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
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
        <Typography variant="button">
          {product.title.length > 23
            ? product.title.replace(/^(.{23}[^\s]*).*/, '$1')
            : product.title}
        </Typography>
        <Typography variant="button">{`${Number(product.price).toFixed(2)}€`}</Typography>
      </Paper>
    </Grid>
  );
}

export default withStyles(Styles)(ProductItem);
