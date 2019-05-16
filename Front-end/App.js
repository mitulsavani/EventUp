import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContainer } from './src/navigation/Router';
export default class App extends React.Component {
  
  render() {
    return (
      <AppContainer/>
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
