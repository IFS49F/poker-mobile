import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Notification extends React.Component {
  render() {
    const { active, onReconn } = this.props;
    return (
      <View style={[styles.container, active && styles.containerActive]}>
        <Text
          style={styles.text}>
          {'You seems offline... '}
          <Text
            style={styles.connLink}
            onPress={onReconn}>
            Reconnect
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'none',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'crimson',
  },
  containerActive: {
    display: 'flex',
  },
  text: {
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  connLink: {
    marginLeft: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
});
