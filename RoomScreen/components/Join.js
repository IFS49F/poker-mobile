import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: ''
    };
  }

  async componentDidMount() {
    try {
      const myName = await AsyncStorage.getItem(playerNameStoreKey);
      this.setState({ myName });
    } catch (error) {}
  }

  handleChangeText = (myName) => {
    this.setState({ myName });
  };

  handleSubmit = async () => {
    try {
      await AsyncStorage.setItem(playerNameStoreKey, this.state.myName);
    } catch (error) {}
    this.props.onSubmit(this.state.myName);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Observe or </Text>
        <TextInput
          style={styles.textInput}
          autoFocus={false}
          autoCapitalize="words"
          value={this.state.myName}
          onChangeText={this.handleChangeText}
          placeholder="type in your name"
          required
          autoFocus />
        <Text> to </Text>
        <Button
          title="Play"
          color="yellowgreen"
          onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'rgb(239, 239, 242)',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    textAlign: 'center',
  },
});

const playerNameStoreKey = '@Poker4FunStore:playerName';
