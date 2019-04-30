import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import * as allUsersAction from '../../actions/allUsersAction';
import * as deleteUserAction from '../../actions/deleteUserAction';
import Styles from './Styles';
import CustomTableCell from './customTableCell';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: [],
      users: [],
      openModal: false,
      query: '',
      columnToQuery: 'email'
    };
  }

  componentDidMount() {
    const { setError } = this.props;
    allUsersAction
      .getAllUsers()
      .then(res => {
        this.setState({ users: res });
        this.filtering();
      })
      .catch(err => {
        setError(err);
      });
  }

  deleteUser = email => {
    const { setError } = this.props;
    // console.log(email);
    deleteUserAction
      .deleteUsers(email)
      .then(() => this.componentDidMount())
      .catch(err => {
        setError(err);
      });
  };

  handleChange = event => {
    this.setState({ columnToQuery: event.target.value });
  };

  textFieldHandleChange = event => {
    this.setState({ query: event.target.value }, () => this.filtering());
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  filtering = () => {
    const { users, query, columnToQuery } = this.state;
    let data = [];
    if (query.length !== 0) {
      data = users.filter(x => x[columnToQuery].includes(query));
    } else {
      data = users;
    }
    // console.log(data);

    this.setState({ filteredUsers: data });
  };

  render() {
    const { openModal, filteredUsers, columnToQuery, query } = this.state;
    const { classes } = this.props;
    // console.log(filteredUsers);
    // console.log(query);

    return (
      <div>
        <Button onClick={this.handleOpen}>Labas</Button>
        <Modal open={openModal} onClose={this.handleClose}>
          <div className={classes.paper}>
            <Select
              value={columnToQuery}
              onChange={(event, index, value) => {
                this.setState({ columnToQuery: value });
              }}
            >
              <MenuItem value="firstName"> First Name</MenuItem>
              <MenuItem value="lastName">First Name </MenuItem>
              <MenuItem value="email">Email </MenuItem>
            </Select>
            <TextField
              name="search"
              label="Search"
              value={query}
              onChange={e => {
                this.textFieldHandleChange(e);
              }}
            />
            <Table className={classes.root}>
              <TableHead>
                <TableRow>
                  <CustomTableCell align="left">Name</CustomTableCell>
                  <CustomTableCell align="left">Surname</CustomTableCell>
                  <CustomTableCell align="left">Email</CustomTableCell>
                  <CustomTableCell align="center">Delete</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow className={classes.row}>
                    <CustomTableCell>{user.name}</CustomTableCell>
                    <CustomTableCell align="left">{user.surname}</CustomTableCell>
                    <CustomTableCell align="left">{user.email}</CustomTableCell>
                    <CustomTableCell align="left">
                      <IconButton
                        align="left"
                        className={classes.button}
                        onClick={() => this.deleteUser(user.email)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
