import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { loginUser } from '../../utils/redux/actions/authentication';

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      email: '',
      password: '',
      emailErrorText: ' ',
      isEmailError: false,
      passwordErrorText: ' ',
      isPasswordError: false
    };
    this.state = this.initialstate;
  }

  validate = () => {
    let isError = false;
    const { email, password } = this.state;
    const errors = {
      emailErrorText: ' ',
      passwordErrorText: ' ',
      isEmailError: false,
      isPasswordError: false
    };

    if (email.length !== 0) {
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length > 128) {
        isError = true;
        errors.emailErrorText = 'Requires valid email';
        errors.isEmailError = true;
      }
    }
    if (password.length !== 0) {
      if (password.length < 8 || password.length > 255) {
        isError = true;
        errors.passwordErrorText = 'Password must contain at least 8 symbols';
        errors.isPasswordError = true;
      }
    }
    this.setState({ ...errors });

    return isError;
  };

  handleChange = e => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault(); // preventing browser to reload
    const { email, password } = this.state;

    const data = JSON.stringify({
      email,
      password
    });

    // https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#18_Set_the_Auth_token
    loginUser(data);

    const url = `http://localhost:5000/api/user/login`;
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(`Res.Data:\n${res.data}`);
        const jwttoken = res.data;
        localStorage.clear();
        localStorage.setItem('jwtToken', jwttoken); // adds token to browser's local storage
        setAuthToken(jwttoken); // adds token to all axios headers

        const decoded = jwtDecode(jwttoken);
        // eslint-disable-next-line no-console
        console.log(`Decoded:\n${JSON.stringify(decoded)}`);
      });
  };

  mergedSubmitClose = () => {
    const { passClose } = this.props;
    this.handleSubmit();
    if (!this.validate()) passClose();
  };

  render() {
    const {
      email,
      password,
      emailErrorText,
      isEmailError,
      passwordErrorText,
      isPasswordError
    } = this.state;

    return (
      <div>
        {/* <form onSubmit={this.mergedSubmitClose}> */}
        <form onSubmit={this.handleSubmit}>
          <TextField
            autoFocus
            name="email"
            label="Email"
            type="email"
            value={email}
            required
            onChange={this.handleChange}
            error={isEmailError}
            helperText={emailErrorText}
            onBlur={this.validate}
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            required
            onChange={this.handleChange}
            error={isPasswordError}
            onBlur={this.validate}
            helperText={passwordErrorText}
            margin="normal"
          />
          <Button variant="outlined" type="submit">
            Log in
          </Button>
        </form>
      </div>
    );
  }
}

// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };

export default Form;
