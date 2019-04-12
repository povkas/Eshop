import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { Menu } from '@material-ui/icons';
import { DropDownCategories } from '.';
import * as categoriesAction from '../../actions/categoriesAction';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      left: false
    };
  }

  componentDidMount() {
    categoriesAction.getCategories().then(res => {
      this.setState({ categories: res });
    });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { left, categories } = this.state;
    const { selectCategory } = this.props;

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}>
          <Menu />
        </IconButton>
        <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', true)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <List>
              {categories.map(category => (
                <DropDownCategories
                  selectCategory={selectCategory}
                  key={category.category}
                  category={category.category}
                />
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  selectCategory: PropTypes.func.isRequired
};

export default CategoriesList;
