import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FiberManualRecord } from '@material-ui/icons';

function DropDownCategories(props) {
  const { category, selectCategory } = props;

  return (
    <ListItem
      onClick={() => {
        selectCategory(category);
      }}
      button
    >
      <ListItemIcon>
        <FiberManualRecord />
      </ListItemIcon>
      <ListItemText primary={category} />
    </ListItem>
  );
}

DropDownCategories.propTypes = {
  selectCategory: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired
};

export default DropDownCategories;
