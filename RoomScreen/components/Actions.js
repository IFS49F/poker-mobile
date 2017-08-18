import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { validScores } from '../../lib/constants';

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
        <Button
          key={item}
          style={styles.voteButton}
          title={`${item}`}
          onPress={() => onVote(item)} />
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
    padding: 20,
    backgroundColor: 'rgb(239, 239, 242)',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  votesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  voteButton: {
    width: 20,
    height: 20,
  },
});
