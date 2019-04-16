import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
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

class SignupScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Sign Up',
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
      name: undefined,
      email: undefined,
      password: undefined,
      enabled: false,
      loading: false
    }

    this.updateSignupField = key => text => this.updateSignupFieldState(key, text);
    this.loginAction = this.loginAction.bind(this);
  }

  updateSignupFieldState(key, value) {
    this.setState({ [key]: value }, this.checkEnabled);
  }

  checkEnabled() {
    const { email, password } = this.state;

    this.setState({ enabled: emailValidator(email) && password && password.length > 0 });
  }

  loginAction() {
    // const { email, password } = this.state;
    // this.setState({ loading: true });
    
    Alert.alert(
      'Alert!',
      'You have successfully logged in',
      [
        { text: 'OK', onPress: () => this.setState({ loading: false }) }
      ],
      { cancelable: false }
    );

    var details = {
      "FirstName": "Bob",
      "LastName": "Smith",
      "Email": "bsmith@gmail.com",
      "Password": "password"
};

    // var formBody = [];
    
    //     for (var property in details) {
    //       var encodedKey = encodeURIComponent(property);
    //       var encodedValue = encodeURIComponent(details[property]);
    
    //       formBody.push(encodedKey + "=" + encodedValue);
    //     }
    
    //     formBody = formBody.join("&");
     
        // axios.post('http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/users/register', {
        //   FirstName: "Bob",
        //   LastName: "Smith",
        //   Email: "bsmith@gmail.com",
        //   Password: "password"
        // })
        // .then(function (response) {
        //   console.log("This is the response : ", response);
        // })
        // .catch(function (error) {
        //   console.log("This is the error : ", error);
        // });
  

  }

  render() {
    const { name, email, password, loading, enabled } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Name"
            placeholder="Enter your name"
            value={name}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateSignupField('name')}
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
            label="Email"
            placeholder="Enter your email"
            value={email}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateSignupField('email')}
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
            onChangeText={this.updateSignupField('password')}
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
            title="Sign Up"
            titleStyle={{ fontSize: 20, marginTop: 5 }}
            containerStyle={{ marginTop: 20, marginBottom: 30 }}
            buttonStyle={{ height: 50, borderRadius: 5, backgroundColor: PRIMARY_COLOR }}
            activeOpacity={0.8}
            disabled={!enabled}
            loading={loading}
            onPress={this.loginAction}
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

export default SignupScreen;