import React from 'react';
import { StyleSheet, Text, View, Button, Share } from 'react-native';

export default class RoomScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.room,
    headerRight: (
      <Button
        title='Share'
        onPress={() => {
          Share.share({
            message: 'Join Poker4Fun session',
            url: `https://poker4.fun/${navigation.state.params.room}`,
            excludedActivityTypes: [
              'com.apple.UIKit.activity.AddToReadingList'
            ]
          });
        }} />
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
