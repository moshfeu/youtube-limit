import React from 'react';
import { ScrollView, Text, Image, TouchableOpacity } from 'react-native';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'powderblue'}}>
      {this.props.items.map(item =>
        <TouchableOpacity onPress={() => this.props.itemClicked(item)} key={item.id}>
          <Image source={{uri: item.img}}  style={{width: 50, height: 50}} />
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
      </ScrollView>
    )
  }
}