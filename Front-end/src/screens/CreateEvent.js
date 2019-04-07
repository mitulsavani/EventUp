import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CreateEvent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CreateEvent</Text>
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
