import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Alert, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import axios from 'axios';

// Shared Utils
export const emailValidator = (email) => {
  const email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.(\w|\|){2,})+$/;

  return email_reg.test(email);
};

// Colors
export const PRIMARY_COLOR = '#39CA74';
export const DARK_GRAY = '#757575';
export const BLACK = '#000000';
export const WHITE = '#ffffff';

class LoginScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Log in',
      headerBackTitle: ' ',
      headerTintColor: BLACK,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: WHITE
      },
    headerTitleStyle: {
      fontSize: 20,
      color: BLACK,
    }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined,
      enabled: false,
      loading: false
    }

    this.updateLoginField = key => text => this.updateLoginFieldState(key, text);
    this.loginAction = this.loginAction.bind(this);
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  updateLoginFieldState(key, value) {
    this.setState({ [key]: value }, this.checkEnabled);
  }

  checkEnabled() {
    const { email, password } = this.state;

    this.setState({ enabled: emailValidator(email) && password && password.length > 0 });
  }

async loginAction() {

  this.setState({ isLoading: true })
  
      const { email, password } = this.state
      const { navigate } = this.props.navigation

      console.log("Details : ", email, " ",password);
    try {
       let response = await fetch('http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: 
          JSON.stringify({
            "Email" : email,
            "Password" : password
        })
      });

      response.json().then(result => {
        console.log("This is the response:", result)
      })
      console.log("This is the response : ",response.json)
    } catch (error) {
      this.setState({ loading: false, response: error })
      console.log("This is the error : ", error)
    }

  }


  render() {
    const { email, password, loading, enabled } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Email"
            placeholder="Enter your email"
            value={email}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateLoginField('email')}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            ref={(input) => { this.emailInput = input; }}
            onSubmitEditing={() => { this.passwordInput.focus() }}
          />
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Password"
            placeholder="Enter your password"
            value={password}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateLoginField('password')}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            ref={(input) => { this.passwordInput = input; }}
            onSubmitEditing={enabled ? this.loginAction : undefined}
          />
          <Button
            title="Log in"
            titleStyle={{ fontSize: 20, marginTop: 5 }}
            containerStyle={{ marginTop: 20, marginBottom: 30 }}
            buttonStyle={{ height: 50, borderRadius: 5, backgroundColor: PRIMARY_COLOR }}
            activeOpacity={0.8}
            disabled={!enabled}
            loading={loading}
            onPress={this.loginAction}
          />
          <Button
            type="clear"
            title="Forgot password?"
            titleStyle={{ fontSize: 16, color: DARK_GRAY }}
            onPress={() => console.log('Reset Password')}
          />
          <Button
            type="clear"
            title="Create an account"
            titleStyle={{ fontSize: 16, color: PRIMARY_COLOR }}
            onPress={() => this.props.navigation.navigate('signup')}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 100
  }
});

export default LoginScreen;

