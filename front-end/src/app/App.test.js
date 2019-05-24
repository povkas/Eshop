import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('Main body tests', () => {
  it('Main body renders', () => {
    expect(mount(<App />));
  });
});
