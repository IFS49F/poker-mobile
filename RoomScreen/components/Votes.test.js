import React from 'react';
import Votes from './Votes';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Votes />).toJSON();
  expect(rendered).toBeTruthy();
});
