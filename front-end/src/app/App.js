import React from 'react';
import { Provider } from 'react-redux';
import MainBody from '../components/mainBody/MainBody';
import { NavBarContainer } from '../components/Navbar';
import Store from '../utils/redux/store';

export default () => (
  <Provider store={Store}>
    <NavBarContainer />
    <MainBody />
  </Provider>
);
