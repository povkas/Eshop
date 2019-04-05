import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';

function Filter(props) {
  const {
    classes,
    upperPriceLimit,
    lowerPriceLimit,
    date,
    changeDate,
    changePriceLower,
    changePriceUpper,
    lowerPriceLimitHelper,
    upperPriceLimitHelper
  } = props;

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
            value={lowerPriceLimit}
            onChange={changePriceLower}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            helperText={lowerPriceLimitHelper}
            margin="normal"
          />
          <TextField
            id="to-price"
            label="To"
            value={upperPriceLimit}
            onChange={changePriceUpper}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            helperText={upperPriceLimitHelper}
            margin="normal"
          />
        </div>
        <div className={classes.inputs}>
          <Typography variant="subheading">Date added</Typography>
          <Select value={date} onChange={changeDate}>
            <MenuItem value="all">Show all</MenuItem>
            <MenuItem value="day">Less than a day ago</MenuItem>
            <MenuItem value="week">Less than a week ago</MenuItem>
            <MenuItem value="month">Less than a month ago</MenuItem>
            <MenuItem value="year">Less than a year ago</MenuItem>
          </Select>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

Filter.propTypes = {
  classes: PropTypes.shape().isRequired,
  upperPriceLimit: PropTypes.number.isRequired,
  lowerPriceLimit: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  changeDate: PropTypes.func.isRequired,
  changePriceLower: PropTypes.func.isRequired,
  changePriceUpper: PropTypes.func.isRequired,
  lowerPriceLimitHelper: PropTypes.string.isRequired,
  upperPriceLimitHelper: PropTypes.string.isRequired
};

export default withStyles(styles)(Filter);
