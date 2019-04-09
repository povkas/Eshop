import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

function DropDownCategories(props) {
  const { category } = props;
  return (
    <div>
      <MenuItem>{category.category}</MenuItem>
    </div>
  );
}

DropDownCategories.propTypes = {
  category: PropTypes.shape().isRequired
};

export default DropDownCategories;
