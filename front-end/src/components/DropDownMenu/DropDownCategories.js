import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

class DropDownCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { category, selectCategory } = this.props;

    return (
      <ListItem
        onClick={() => {
          selectCategory(category);
        }}
        button
      >
        <ListItemText primary={category.category} />
      </ListItem>
    );
  }
}

DropDownCategories.propTypes = {
  selectCategory: PropTypes.shape().isRequired,
  category: PropTypes.shape().isRequired
};

export default DropDownCategories;
