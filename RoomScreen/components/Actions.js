import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { sizeRatio, validScores } from '../../lib/constants';

export default class Actions extends React.Component {
  checkSelectedValue(value, selectedValue) {
    if (typeof value === 'string') {
      return value === selectedValue;
    }

    return value === parseInt(selectedValue, 10);
  }

  render() {
    const { show, myScore, onVote, onShow, onClear } = this.props;
    const listItems = validScores.map((item) => {
      const isSelected = this.checkSelectedValue(item, myScore);
      return (
        <TouchableOpacity
          key={item}
          style={isSelected ? styles.votesButtonSelected : styles.votesButton}
          onPress={() => onVote(item)}>
          <Text
            style={styles.votesButtonText}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.votesList}>
          {listItems}
        </View>
        {show ? (
          <Button
            title="Clear"
            color="crimson"
            onPress={onClear} />
        ) : (
          <Button
            title="Show"
            color="yellowgreen"
            onPress={onShow} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    borderBottomColor: 'rgb(227, 227, 232)',
    borderBottomWidth: 1,
  },
  votesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  votesButton: {
    margin: 3 * sizeRatio,
    padding: 5 * sizeRatio,
    borderRadius: 5 * sizeRatio,
  },
  votesButtonSelected: {
    margin: 3 * sizeRatio,
    padding: 5 * sizeRatio,
    borderRadius: 5 * sizeRatio,
    backgroundColor: 'lightgrey',
  },
  votesButtonText: {
    fontSize: 16 * sizeRatio,
    color: 'royalblue',
  },
});
