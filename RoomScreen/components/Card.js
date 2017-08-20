import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { sizeRatio } from '../../lib/constants';

export default class Card extends React.Component {
  showVoteValue() {
    const { score, voted, show } = this.props;

    if (!show) { return ''; }

    if (!voted) { return '😴'; }

    return score;
  }

  render() {
    const { voted, show } = this.props;

    return (
      <FlipCard
        style={[styles.container, voted && styles.voted]}
        flip={!show}
        flipHorizontal={true}
        flipVertical={false}
        friction={10}
        perspective={1000}>
        <View style={styles.face}>
          <Text style={styles.text}>{this.showVoteValue()}</Text>
        </View>
        <View style={[styles.face, styles.back]}>
          <Text style={[styles.text, styles.backText]}>♤</Text>
        </View>
      </FlipCard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    opacity: 0.3,
  },
  voted: {
    opacity: 1,
  },
  face: {
    width: 60 * sizeRatio,
    height: 90 * sizeRatio,
    borderWidth: 2,
    borderColor: 'darkslategrey',
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  back: {
    backgroundColor: 'darkslategrey',
  },
  text: {
    color: 'darkslategrey',
    fontSize: 30 * sizeRatio,
    textAlign: 'center',
    lineHeight: 90 * sizeRatio,
  },
  backText: {
    color: 'lightslategrey',
    lineHeight: 80 * sizeRatio,
  }
});
