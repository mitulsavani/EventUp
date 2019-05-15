import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Image,
  createAppContainer,
  createStackNavigator
} from "react-native";
import { withNavigation, withNavigationFocus } from "react-navigation";
import { format } from 'date-fns';
import moment from 'moment';

class RsvpScreen extends React.Component {
  static navigationOptions = {
    title: "Tickets",
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerStyle: {
      backgroundColor: "#39CA74"
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      events: []
    };
  }

  loadRSVPEvents = async () => {
    this.setState({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      console.log("USER ID: ", userId);
      console.log("Token: ", token);

      try {
        let response = await fetch(
          `http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/users/RSVP/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: token
            }
          }
        );

        response.json().then(result => {
          console.log(result);
          this.setState({ events: result.data, isLoading: false });
        });
      } catch (error) {
        this.setState({ response: error });
        console.log(error);
      }
    } catch (e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }
  }

  async componentDidMount() {
    this.loadRSVPEvents()
  }

  async componentDidUpdate(prevProps) {
    const { navigation } = this.props;

    if((prevProps.isFocused !== this.props.isFocused) && this.props.isFocused) {
      console.log("Reloading RSVP'd Events");
      this.loadRSVPEvents()
    }
  }

  _renderEvents = item => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        key={item}
        activeOpacity={0.8}
      >
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Image
            source= {{uri:"http://"+item.Image}}
            style={styles.imageEx}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.titleStyling}>{item.Name}</Text>
            <Text style={{ color: "#333" }}>
              {moment.utc(item.StartDate).format("MMMM DD")}
              {" | "}
              {format("January 01, 2019 " + item.StartTime, "hh:mm a")}
            </Text>
            <Text style={{ color: "#333" }}>{item.LocationName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { events } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={events}
            renderItem={({ item }) => this._renderEvents(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
  },
  imageEx: {
    width: 120,
    height: 120
  },
  titleStyling: {
    fontFamily: "Verdana",
    fontSize: 18
  },
  cardContainer: {
    margin: 10,
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "lightgrey",
    position: "relative",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.1
  }
});

export default withNavigationFocus(RsvpScreen);