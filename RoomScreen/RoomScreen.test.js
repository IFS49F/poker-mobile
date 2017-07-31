import React from 'react';
import RoomScreen from './RoomScreen';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<RoomScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
