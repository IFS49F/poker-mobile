import React from 'react';
import Actions from './Actions';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Actions />).toJSON();
  expect(rendered).toBeTruthy();
});
