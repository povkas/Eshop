import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';

function Filter(props) {
  const { classes } = props;
  return (
    <ExpansionPanel className={classes.expansion}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subheading" color="textPrimary">
          Filters
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.filterDiv}>
        <div className={classes.inputs}>
          <Typography variant="subheading">Price</Typography>
          <TextField
            id="from-price"
            label="From"
            value="B"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            id="to-price"
            label="To"
            value="A"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </div>
        <div className={classes.inputs}>
          <Typography variant="subheading">Date added</Typography>
          <TextField
            id="from-year"
            label="From"
            value="B"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            id="to-year"
            label="To"
            value="A"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(Filter);
