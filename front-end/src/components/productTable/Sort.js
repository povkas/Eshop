import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';

const pages = [6, 12, 24, 48];

function Sort(props) {
  const { numberOfProducts, sortCriteria, changeSort, changeNumberOfProducts, classes } = props;
  return (
    <div className={classes.sortDiv}>
      <Typography variant="subheading" className={classes.sortText}>
        Products per page:
      </Typography>
      <Select value={numberOfProducts} onChange={changeNumberOfProducts} className={classes.select}>
        {pages.map(a => (
          <MenuItem value={a} key={a}>
            {a}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="subheading" className={classes.sortText}>
        Sort by:
      </Typography>
      <Select value={sortCriteria} onChange={changeSort} className={classes.select}>
        <MenuItem value="nameDescending">A-Z</MenuItem>
        <MenuItem value="nameAscending">Z-A</MenuItem>
        <MenuItem value="priceDescending">Price descending</MenuItem>
        <MenuItem value="priceAscending">Price ascending</MenuItem>
        <MenuItem value="dateDescending">Oldest first</MenuItem>
        <MenuItem value="dateAscending">Newest first</MenuItem>
      </Select>
    </div>
  );
}

Sort.propTypes = {
  classes: PropTypes.shape().isRequired,
  changeSort: PropTypes.func.isRequired,
  sortCriteria: PropTypes.string.isRequired,
  numberOfProducts: PropTypes.number.isRequired,
  changeNumberOfProducts: PropTypes.func.isRequired
};

export default withStyles(Styles)(Sort);
