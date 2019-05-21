import React from 'react';
import { shallow } from 'enzyme';

import MainBody from './MainBody';

describe('Main body tests', () => {
  it('Main body renders', () => {
    shallow(<MainBody />);
  });
});
