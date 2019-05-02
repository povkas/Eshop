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
      query: ''
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
    this.setState({ query: event.target.value }, () => this.filtering());
  };

  filtering = () => {
    const { users, query } = this.state;
    const email = 'email';
    let data = [];
    if (query.length !== 0) {
      data = users.filter(x => x[email].includes(query));
    } else {
      data = users;
    }

    this.setState({ filteredUsers: data });
  };

  render() {
    const { filteredUsers, query } = this.state;
    const { classes, open, closeModal, openModal } = this.props;

    return (
      <div>
        <Button onClick={openModal}>Labas</Button>
        <Modal open={open} onClose={closeModal}>
          <div className={classes.paper}>
            <TextField
              name="search"
              label="Search by email"
              value={query}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <Table className={classes.root}>
              <TableHead>
                <TableRow>
                  <CustomTableCell className={classes.borderTopLeftRadius}>Name</CustomTableCell>
                  <CustomTableCell>Surname</CustomTableCell>
                  <CustomTableCell>Email</CustomTableCell>
                  <CustomTableCell>Role</CustomTableCell>
                  <CustomTableCell className={classes.borderTopRightRadius} />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow className={classes.row}>
                    <CustomTableCell>{user.name}</CustomTableCell>
                    <CustomTableCell>{user.surname}</CustomTableCell>
                    <CustomTableCell>{user.email}</CustomTableCell>
                    <CustomTableCell>{user.isAdmin ? 'Admin' : 'User'}</CustomTableCell>
                    <CustomTableCell>
                      <IconButton
                        disabled={user.isAdmin}
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
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(UserList);
