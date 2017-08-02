import React from 'react';
import Join from './Join';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Join />).toJSON();
  expect(rendered).toBeTruthy();
});
