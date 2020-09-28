import React from 'react';
import { Text, View } from 'react-native';
import { OfflineNotice } from './src/components/common';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <OfflineNotice />
      </View>
    );
  }
}
