import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Card from './Card';
import { sizeRatio } from '../../lib/constants';

const collator = { compare: (a, b) => a.localeCompare(b) };

export default class Votes extends React.Component {
  render() {
    const { me, myScore, team, show } = this.props;
    const listItems = team
      .slice() // shallow copy to prevent sort from mutating the state directly
      .sort((a, b) => collator.compare(a.name, b.name))
      .map((member) =>
        <View key={member.id} style={styles.person}>
          <Card
            score={member.score}
            voted={member.voted}
            show={show} />
          <Text
            style={styles.name}
            numberOfLines={1}>
            {member.name}
          </Text>
        </View>
      );
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        {me && (
          <View key={me.id} style={styles.person}>
            <Card
              score={myScore}
              voted={me.voted}
              show={show} />
            <Text
              style={styles.name}
              numberOfLines={1}>
              {me.name}
            </Text>
          </View>
        )}
        {listItems}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  person: {
    margin: 20 * sizeRatio,
  },
  name: {
    width: 60 * sizeRatio,
    fontSize: 12 * sizeRatio,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
