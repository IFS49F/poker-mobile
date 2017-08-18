import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: 'rgb(239, 239, 242)',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -2 },
    elevation: 1,
  },
  valuesPair: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  scoreContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  score: {
    color: 'darkslategrey',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 50,
  },
  count: {
    fontSize: 15,
  },
});
