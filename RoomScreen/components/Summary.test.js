import React from 'react';
import Summary from './Summary';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Summary />).toJSON();
  expect(rendered).toBeTruthy();
});
