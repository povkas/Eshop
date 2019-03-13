import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      email: '',
      password: ''
    };
    this.state = this.initialstate;

    this.handleChange = this.handleChange.bind(this);
    // this.submitForm = this.submitForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // neveikia @tania
  // submitForm = () => {
  //   const { props } = this.props;
  //   props.handleSubmit(this.state);
  //   this.setState(this.initialState);
  // };

  // neveikia @tania
  // handleChange = event => {
  //   const { email, password } = event.target;
  //   this.setState({ email, password });
  // };

  handleChange(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  // handleSubmit(e) {
  //   e.preventDefault();

  //   const { email, password } = this.state;
  //   console.log('The form was submitted with the following data:');
  //   console.log(email);
  //   console.log(password);
  // }

  handleSubmit() {
    const { email, password } = this.state;
    this.setState({ email, password });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        {/* <form onSubmit={this.handleSubmit}> */}
        <form>
          <Input
            autoFocus
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
            type="email"
          />
          <br />
          <Input
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
          />
        </form>
        <br />
        {/* <Button variant="outlined" onClick={this.submitForm} type="submit"> */}
        <Button variant="outlined" onClick={this.handleSubmit} type="submit">
          Log in
        </Button>
      </div>
    );
  }
}

export default Form;
