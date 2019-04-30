import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { getAllUsers, deleteUsers } from '../../actions/usersAction';
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
    getAllUsers()
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
    deleteUsers(email)
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

    this.setState({ filteredUsers: data });
  };

  render() {
    const { openModal, filteredUsers, query } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Labas</Button>
        <Modal open={openModal} onClose={this.handleClose}>
          <div className={classes.paper}>
            <TextField
              name="search"
              label="Search by email"
              value={query}
              onChange={e => {
                this.textFieldHandleChange(e);
              }}
            />

            <Table className={classes.root}>
              <TableHead>
                <TableRow>
                  <CustomTableCell className={classes.borderTopLeftRadius} align="left">
                    Name
                  </CustomTableCell>
                  <CustomTableCell align="left">Surname</CustomTableCell>
                  <CustomTableCell align="left">Email</CustomTableCell>
                  <CustomTableCell align="left">Role</CustomTableCell>
                  <CustomTableCell className={classes.borderTopRightRadius} align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow className={classes.row}>
                    <CustomTableCell>{user.name}</CustomTableCell>
                    <CustomTableCell align="left">{user.surname}</CustomTableCell>
                    <CustomTableCell align="left">{user.email}</CustomTableCell>
                    <CustomTableCell align="left">
                      {user.isAdmin ? 'Admin' : 'User'}
                    </CustomTableCell>
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
            {filteredUsers.length === 0 ? (
              <div className={classes.emptyArray}>There are no matching users</div>
            ) : null}
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
