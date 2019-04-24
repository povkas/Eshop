import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Menu, FiberManualRecord } from '@material-ui/icons';
import { DropDownCategories } from '.';
import * as categoriesAction from '../../actions/categoriesAction';
import Styles from './Styles';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      left: false
    };
  }

  componentDidMount() {
    const { setError } = this.props;
    categoriesAction
      .getCategories()
      .then(res => {
        res.sort((a, b) => a.category.localeCompare(b.category));
        this.setState({ categories: res });
      })
      .catch(err => {
        setError(err.response ? err.response.data : { status: 404, message: 'Unidentified' });
      });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { left, categories } = this.state;
    const { filterByCategory, classes, currentCategory } = this.props;

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}>
          <Menu className={classes.menuButton} />
        </IconButton>
        <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {classes.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                onClick={() => {
                  filterByCategory('');
                }}
                button
              >
                <ListItemIcon>
                  <FiberManualRecord />
                </ListItemIcon>
                <ListItemText primary="All" />
              </ListItem>
              {categories.map(category => (
                <DropDownCategories
                  filterByCategory={filterByCategory}
                  isSelected={currentCategory === category.category}
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
  filterByCategory: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(CategoriesList);
