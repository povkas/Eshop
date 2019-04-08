import React from 'react';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import IconButton from '@material-ui/core/IconButton';

function DropDownCategories(props) {
  const { category } = props;

  return (
    <div>
      <MenuItem>{category.Category}</MenuItem>
    </div>
  );
}

export default DropDownCategories;
