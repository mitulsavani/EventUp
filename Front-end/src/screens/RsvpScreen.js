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
import { withNavigationFocus } from "react-navigation";
import { format } from 'date-fns';
import moment from 'moment';

export default class RsvpScreen extends React.Component {
  static navigationOptions = {
    title: `My Tickets`,
    headerTitleStyle: {
      fontWeight: "bold",
      color: "#FFCC33"
    },
    headerTintStyle: {
      color: '#FFCC33'
    },
    headerStyle: {
      backgroundColor: "#330033"
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      events: []
    };
  }

  async componentDidMount() {
    this.loadRSVPEvents()
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


  _renderEvents = item => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        key={item}
        onPress={() => this.props.navigation.navigate("detailEvent", { item })}
        activeOpacity={0.8}
      >
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: "http://" + item.Image }}
            style={styles.imageEx}
          />
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: 20,
            marginRight: 10
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.titleStyling}>{item.Name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "gray", fontSize: 14, fontFamily: 'Futura-Medium' }}>
              {item.LocationName}
            </Text>
            <Text style={{ color: "gray", fontSize: 14, fontFamily: 'Futura-Medium' }}>
              {format("January 01, 2019 " + item.StartTime, "hh:mm a")}
            </Text>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              justifyContent: "center",
              width: 80, 
              height: 40,
            }}
          >
            <Text style={{ color: "#463077", fontSize: 20, fontFamily: 'Futura' }}>
              {moment.utc(item.StartDate).format("MMMM DD")}
            </Text>
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
            onRefresh={() => this.loadRSVPEvents()}
            refreshing={this.state.isLoading}
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
    fontFamily: "Futura",
    fontSize: 20,
    color: "#333"
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