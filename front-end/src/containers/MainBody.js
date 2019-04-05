import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ProductTable from '../components/productTable/ProductTable';
import Styles from './Styles';

const MainBody = props => {
  const { classes } = props;
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      <Grid item>
        <Paper className={classes.paper} elevation={24}>
          <BrowserRouter>
            <Route path="/" component={ProductTable} />
          </BrowserRouter>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(Styles)(MainBody);
