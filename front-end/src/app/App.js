import React from 'react';
import { Provider } from 'react-redux';
import { MainBody } from '../containers';
import { NavBar } from '../components/Navbar';
import Store from '../utils/redux/store';

export default () => (
  <Provider store={Store}>
    <NavBar />
    <MainBody />
  </Provider>
);
