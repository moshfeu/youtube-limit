import React from 'react';
import { WebView } from 'react-native';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WebView
        style={{flex: 2, height: 200}}
        javaScriptEnabled={true}
        source={{uri: `https://www.youtube.com/embed/${this.props.videoId}?rel=0&autoplay=1&showinfo=0&controls=0`}}
      />
    )
  }
}