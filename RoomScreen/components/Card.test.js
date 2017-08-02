import React from 'react';
import Card from './Card';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Card />).toJSON();
  expect(rendered).toBeTruthy();
});
