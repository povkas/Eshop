import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import * as allUsersAction from '../../actions/allUsersAction';
import * as deleteUserAction from '../../actions/deleteUserAction';
import Styles from './Styles';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      openModal: false
    };
  }

  componentDidMount() {
    const { setError } = this.props;
    allUsersAction
      .getAllUsers()
      .then(res => {
        this.setState({ users: res });
      })
      .catch(err => {
        setError(err);
      });
  }

  deleteUser = id => {
    const { setError } = this.props;
    deleteUserAction.deleteUsers(id).catch(err => {
      setError(err);
    });
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { openModal, users } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Labas</Button>
        <Modal open={openModal} onClose={this.handleClose}>
          <div className={classes.paper}>
            <List className={classes.root}>
              {users.map(user => (
                <ListItem key={user.id}>
                  <ListItemText primary={`${user.name} ${user.surname} ${user.email} `} />
                  <ListItemSecondaryAction>
                    <Button className={classes.button} onClick={this.deleteUser(user.id)}>
                      Delete
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Modal>
      </div>
    );
  }
}

UserList.propTypes = {
  setError: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(UserList);
