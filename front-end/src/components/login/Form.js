import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Form extends Component {
  constructor(props) {
    super(props); // receives parent props lol -_-
    this.initialstate = {
      email: '',
      password: ''
    };
    this.state = this.initialstate;

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = event => {
    const { email, password } = event.target;
    this.setState({ email, password });
  };

  submitForm = () => {
    const { props } = this.props;

    props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form onSubmit={this.submitForm}>
          <Input
            autoFocus
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
            type="email"
          />
          <br />
          <Input
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
          />
        </form>
        <br />
        <Button variant="outlined" onClick={this.submitForm} type="submit">
          Log in
        </Button>
      </div>
    );
  }
}

export default Form;
