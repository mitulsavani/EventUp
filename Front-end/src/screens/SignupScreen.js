import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Alert, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";

// Shared Utils
export const emailValidator = email => {
  const email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.(\w|\|){2,})+$/;

  return email_reg.test(email);
};

// Colors
export const PRIMARY_COLOR = "#330033";
export const WHITE = "#ffffff";

class SignupScreen extends Component {
  static navigationOptions = () => {
    return {
      title: "Sign Up",
      headerBackTitle: " ",
      headerTintColor: "#330033",
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: WHITE
      },
      headerTitleStyle: {
        fontSize: 20,
        color: "#330033"
      }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      enabled: false,
      loading: false
    };

    this.updateSignupField = key => text =>
      this.updateSignupFieldState(key, text);
    this.signupAction = this.signupAction.bind(this);
  }

  _signInAsync = async (token, userId) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", userId);
      this.props.navigation.navigate("App");
    } catch (e) {
      console.log("Async storage failed to store token, error: ", e);
    }
  };

  _retrieveTokenAsync = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      console.log("token: ", token);
    } catch (e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }
  };

  updateSignupFieldState(key, value) {
    this.setState({ [key]: value }, this.checkEnabled);
  }

  checkEnabled() {
    const { email, password } = this.state;
    this.setState({
      enabled: emailValidator(email) && password && password.length > 0
    });
  }

  async signupAction() {
    const { firstName, lastName, email, password } = this.state;
    const { navigate } = this.props.navigation;

    try {
      let response = await fetch(
        "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/users/register",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password
          })
        }
      );

      response.json().then(result => {
        //Sign Up Successful
        console.log("RESULT", result);
        if (result.status == true) {
          Alert.alert(
            "Alert!",
            `${result.message}`,
            [
              {
                text: "OK",
                onPress: () =>
                  this._signInAsync(result.token, result.id.toString())
              }
            ],
            { cancelable: false }
          );
        }
        //Sign Up Failed
        else {
          console.log("Sign Up Failed");
        }
      });
    } catch (error) {
      this.setState({ loading: false, response: error });
      console.log(error);
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      loading,
      enabled
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateSignupField("firstName")}
            autoFocus={true}
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            ref={input => {
              this.firstnameInput = input;
            }}
            onSubmitEditing={() => {
              this.lastnameInput.focus();
            }}
          />
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateSignupField("lastName")}
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            ref={input => {
              this.lastnameInput = input;
            }}
            onSubmitEditing={() => {
              this.emailInput.focus();
            }}
          />
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Email"
            placeholder="Enter your email"
            value={email}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateSignupField("email")}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            ref={input => {
              this.emailInput = input;
            }}
            onSubmitEditing={() => {
              this.passwordInput.focus();
            }}
          />
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Password"
            placeholder="Enter your password"
            value={password}
            theme={{ colors: { primary: PRIMARY_COLOR } }}
            onChangeText={this.updateSignupField("password")}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            ref={input => {
              this.passwordInput = input;
            }}
            onSubmitEditing={enabled ? this.signupAction : undefined}
          />
          <Button
            title="Sign Up"
            titleStyle={{ fontSize: 20, marginTop: 5 }}
            containerStyle={{ marginTop: 20, marginBottom: 30 }}
            buttonStyle={{
              height: 50,
              borderRadius: 5,
              backgroundColor: PRIMARY_COLOR
            }}
            activeOpacity={0.8}
            disabled={!enabled}
            loading={loading}
            onPress={this.signupAction}
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
