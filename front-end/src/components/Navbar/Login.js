import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  },
  leftButtons: {
    marginLeft: 20
  }
};

function NavBar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton}>
            <Person />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            BimBam連合
          </Typography>
          <IconButton className={classes.menuButton}>
            <Person />
          </IconButton>

          <IconButton className={classes.menuButton}>
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(NavBar);
