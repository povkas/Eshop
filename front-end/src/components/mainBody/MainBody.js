import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import ProductTable from '../productTable/ProductTable';

const color = grey[100];

const Styles = () => ({
  paper: {
    flexGrow: 1,
    backgroundColor: color,
    width: '50vw',
    minHeight: '90vh',
    margin: '2vh'
  }
});

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
