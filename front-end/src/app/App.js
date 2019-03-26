import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import setAuthToken from '../components/login/setAuthToken';
import { setCurrentUser } from '../utils/redux/actions/authentication';

import { NavBarContainer } from '../components/Navbar';
import Store from '../utils/redux/store';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  Store.dispatch(setCurrentUser(decoded));
}

const a = () => <div />;
export default () => (
  <Provider store={Store}>
    <NavBarContainer />
    <BrowserRouter>
      <Route path="/" component={a} />
    </BrowserRouter>
  </Provider>
);
