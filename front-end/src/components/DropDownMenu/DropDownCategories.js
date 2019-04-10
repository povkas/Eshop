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

  /* selectCategory = category => {
    const { selectedItem } = this.state;
    if (selectedItem === category.category) {
      this.setState({
        selectedItem: ''
      });
    } else {
      this.setState({
        selectedItem: category.category
      });
    }
  }; */

  render() {
    const { category, selectCategory, changeCategory } = this.props;
    // console.log(selectCategory);
    return (
      <ListItem
        onClick={() => {
          selectCategory(category);
          changeCategory();
        }}
        button
        key={category.category}
      >
        <ListItemText primary={category.category} />
      </ListItem>
    );
  }
}

DropDownCategories.propTypes = {
  category: PropTypes.shape().isRequired
};

DropDownCategories.propTypes = {
  selectCategory: PropTypes.shape().isRequired,
  changeCategory: PropTypes.shape().isRequired
};

export default DropDownCategories;
