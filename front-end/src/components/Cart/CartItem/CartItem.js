import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: '500%'
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
});

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src="data:image/png;base64" />
              </ButtonBase>
            </Grid>
            <div className="item-desc">
              <span className="title">title</span>
              <p>{}</p>
              <p>
                <b>Price: {15}$</b>
              </p>
              <p>
                <b>Quantity: {1}</b>
              </p>
            </div>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CartItem);
