import React from 'react';
import Notification from './Notification';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Notification />).toJSON();
  expect(rendered).toBeTruthy();
});
