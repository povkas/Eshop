import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FiberManualRecord } from '@material-ui/icons';

function DropDownCategories(props) {
  const { category, filterByCategory, isSelected } = props;

  return (
    <ListItem
      onClick={() => {
        filterByCategory(category);
      }}
      button
      selected={isSelected}
    >
      <ListItemIcon>
        <FiberManualRecord />
      </ListItemIcon>
      <ListItemText primary={category} />
    </ListItem>
  );
}

DropDownCategories.propTypes = {
  filterByCategory: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired
};

export default DropDownCategories;
