import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { NavBarContainer } from '../components/Navbar';
import Store from '../utils/redux/store';
import { LoginForm } from '../components/login';

const a = () => <div />;
export default () => (
  <Provider store={Store}>
    <NavBarContainer />
    <BrowserRouter>
      <Route path="/" component={a} />
    </BrowserRouter>
    <LoginForm />
  </Provider>
);
