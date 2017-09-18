import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, TouchableOpacity, BackHandler, WebView } from 'react-native';
import { AppKey } from './../config';
import Playlist from './playlist';
import Video from './video';
import { convertToListItem } from './../services/utils'

export default class Playlists extends React.Component {
  apiBase = 'https://www.googleapis.com/youtube/v3/';

  constructor(props) {
    super(props);

    this.state = {
      animating: true,
      playlists: [],
      history: [{route: 'playlists'}]
    }
  }

  loadData(url) {
    this.setState({playlists: [], animating: true});
    return fetch(url).then(data => data.json()).then(data => data.items).then(data => {
      const playlists = convertToListItem(data);
      this.setState({playlists, animating: false});
    });
  }

  loadVideos(playlistId) {
    const url = `${this.apiBase}playlistItems?key=${AppKey}&part=id,snippet&playlistId=${playlistId}`;
    this.loadData(url);
  }

  loadPlaylists(channelId) {
    const url = `${this.apiBase}playlists?key=${AppKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`;
    this.loadData(url);
  }

  getCurrentState() {
    return this.state.history[this.state.history.length - 1]
  }

  updateView() {
    const { route, id } = this.getCurrentState();
    switch(route) {
      case 'playlists':
        this.loadPlaylists('UC2FtQO6HiTYejqkbqrowGSw');
      break;
      case 'playlist':
        this.loadVideos(id);
      break;
    }
  }

  changeState(id) {
    const { history } = this.state;
    const { route } = this.getCurrentState();
    switch (route) {
      case 'playlists':
        history.push({route: 'playlist', id});
      break;
      case 'playlist':
        history.push({route: 'video', id});
      break;
    }

    this.setState({history});
    this.updateView();
  }

  itemClicked = (item) => {
    this.changeState(item.videoId || item.id);
  }

  componentDidMount = () => {
    this.updateView();

    BackHandler.addEventListener('backPress', () => {
      const { history } = this.state;
      if (history.length === 1) {
        return false;
      }
      history.pop();
      this.setState({history});
      this.updateView();
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress')
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'powderblue'}}>
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
        {
          this.getCurrentState().route !== 'video' ?
            <View>
              <Text>this.state.playlists.length: {this.state.playlists.length}</Text>
              <Playlist items={this.state.playlists} itemClicked={this.itemClicked} />
            </View> :
            <View style={styles.flex}>
              <Video videoId={this.getCurrentState().id} />
            </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  flex: {
    flex: 1
  }
});
