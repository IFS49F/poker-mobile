import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen/HomeScreen';
import RoomScreen from './RoomScreen/RoomScreen';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Room: { screen: RoomScreen }
});

export default App;
