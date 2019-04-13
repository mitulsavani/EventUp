import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
    },
    headerStyle: {
      backgroundColor: '#39CA74',
    },
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
            title="Sign Out"
            titleStyle={{ fontSize: 20, marginTop: 5 }}
            containerStyle={{ marginTop: 20, marginBottom: 30 }}
            buttonStyle={{ height: 50, borderRadius: 5, backgroundColor: '#39CA74' }}
            activeOpacity={0.8}
            onPress={this._signOutAsync}
          />
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
