import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sizeRatio } from '../../lib/constants';

export default class Summary extends React.Component {
  render() {
    const { me, team, show } = this.props;
    if (!show) return (
      <View style={styles.container}></View>
    );
    let votes = {};
    team
      .concat([me])
      .forEach((val) => {
        if (!val || !val.voted || val.score === null) return;
        if (votes[val.score]) {
          votes[val.score]++;
        } else {
          votes[val.score] = 1;
        }
      });
    const listItems = Object
      .entries(votes)
      .sort((a, b) => (b[1] - a[1]))
      .map((score) =>
        <View style={[styles.valuesPair]} key={score[0]}>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{score[0]}</Text>
          </View>
          <Text style={styles.count}> × {score[1]}</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        {listItems}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderTopColor: 'rgb(227, 227, 232)',
    borderTopWidth: 1,
  },
  valuesPair: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  scoreContainer: {
    width: 50 * sizeRatio,
    height: 50 * sizeRatio,
    borderRadius: 25 * sizeRatio,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  score: {
    color: 'darkslategrey',
    fontSize: 20 * sizeRatio,
    textAlign: 'center',
    lineHeight: 50 * sizeRatio,
  },
  count: {
    fontSize: 15 * sizeRatio,
  },
});
