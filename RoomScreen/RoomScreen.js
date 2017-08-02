import React from 'react';
import { StyleSheet, Text, View, Button, Share } from 'react-native';
import Notification from './components/Notification';
import Join from './components/Join';
import Actions from './components/Actions';
import Votes from './components/Votes';
import Summary from './components/Summary';
import io from 'socket.io-client';

export default class RoomScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.room,
    headerRight: (
      <Button
        title='Share'
        onPress={() => {
          Share.share({
            message: 'Join Poker4Fun session',
            url: `https://${appDomain}/${navigation.state.params.room}`,
            excludedActivityTypes: [
              'com.apple.UIKit.activity.AddToReadingList'
            ]
          });
        }} />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      me: null,
      myScore: null,
      team: [],
      show: false,
      disconnected: false
    };
  }

  componentDidMount() {
    this.socket = io(serverUrl);

    this.socket.on('stateUpdate', (response, isClearAction) => {
      const me = response.team.find(client => client.id === this.socket.id);
      const team = response.team.filter(client => client.id !== this.socket.id);
      const show = response.show;

      this.setState(prevState => ({
        me,
        myScore: isClearAction ? null : prevState.myScore,
        team,
        show
      }));
    });

    this.socket.on('connect_error', (reason) => {
      this.setState({
        disconnected: true,
        reconnCountdown: Math.floor(this.socket.io.reconnectionDelayMax() / 1000)
      });
    });

    this.socket.on('connect', () => {
      this.setState({
        disconnected: false
      });
    });

    this.room = this.props.navigation.state.params.room;
    this.socket.emit('join', this.room);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleReconn = () => {
    this.socket.open();
  };

  handlePlayerJoin = (name) => {
    this.setState({
      me: {
        id: this.socket.id,
        name,
        score: null,
        voted: false
      }
    });
    this.socket.emit('play', name);
  };

  handleVote = (score) => {
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score, voted: true }),
      myScore: score
    }));
    this.socket.emit('vote', score);
  };

  handleShow = () => {
    this.socket.emit('show');
  };

  handleClear = () => {
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score: null, voted: false }),
      myScore: null,
      team: prevState.team.map(player => (
        Object.assign({}, player, { score: null, voted: false })
      )),
      show: false
    }));
    this.socket.emit('clear');
  };

  render() {
    const { me, myScore, team, show, disconnected } = this.state;
    return (
      <View style={styles.container}>
        {me ? (
          <Actions
            show={show}
            myScore={myScore}
            onVote={this.handleVote}
            onShow={this.handleShow}
            onClear={this.handleClear} />
        ) : (
          <Join
            onSubmit={this.handlePlayerJoin} />
        )}
        <Votes
          me={me}
          myScore={myScore}
          team={team}
          show={show} />
        <Summary
          me={me}
          team={team}
          show={show} />
        <Notification
          active={disconnected}
          onReconn={this.handleReconn} />
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

const appDomain = 'poker4.fun';
const serverUrl = 'https://api.poker4.fun/';
