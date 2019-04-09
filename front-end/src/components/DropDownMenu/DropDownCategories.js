import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

function DropDownCategories(props) {
  const { category } = props;
  return (
    <ListItem button key={category.category}>
      <ListItemText primary={category.category} />
    </ListItem>
  );
}

DropDownCategories.propTypes = {
  category: PropTypes.shape().isRequired
};

export default DropDownCategories;
