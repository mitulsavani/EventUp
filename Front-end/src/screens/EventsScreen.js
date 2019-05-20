import React, { Component } from "react";
import {
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import { Dropdown } from "react-native-material-dropdown";
import { Button } from "react-native-elements";
import { format } from "date-fns";
import moment from "moment";

class EventsScreen extends React.Component {
  static navigationOptions = {
    title: "Events",
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "#FFCC33"
    },
    headerStyle: {
      backgroundColor: "#330033"
    }
  };

  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.categoryRef = this.updateRef.bind(this, "categoryName");

    this.state = {
      eventsData: [],
      isLoading: false,
      error: null,
      categoryName: "",
      categoryData: [],
      categoriesMap: undefined
    };
  }

  async componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    console.log("Refreshing");
    this.setState({ isLoading: true });
    var categoryNames = new Array();
    var categoriesMap = new Map();
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      try {
        let response = await fetch(
          "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: token
            }
          }
        );

        response.json().then(result => {
          this.setState({ eventsData: result.data, isLoading: false });
        });
      } catch (error) {
        this.setState({ response: error });
        console.log(error);
      }

      try {
        let response = await fetch(
          "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: token
            }
          }
        );

        response.json().then(result => {
          categoryNames.push({ value: "All" });
          categoriesMap.set("All", "0");

          result.data.forEach(function(category) {
            categoryNames.push({ value: category.Name });
            categoriesMap.set(category.Name, category.id);
          });
          this.setState({ categoryData: categoryNames });
          this.setState({ categoriesMap: categoriesMap });
        });
      } catch (error) {
        this.setState({ response: error });
        console.log(error);
      }
    } catch (e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }
  };

  onAddCalendarEvent = async item => {
    try {
      //Prompt the user to provide access to the calendar
      const { status } = await Permissions.askAsync(Permissions.CALENDAR);

      //If permission was granted, create the event
      if (status === "granted") {
        var dateString = item.StartDate.substring(0, 10);

        console.log(dateString + "T" + item.StartTime);
        console.log(dateString + "T" + item.EndTime);

        var eventID = await Calendar.createEventAsync(Calendar.DEFAULT, {
          title: item.Name,
          startDate: new Date(dateString + "T" + item.StartTime),
          endDate: new Date(dateString + "T" + item.EndTime),
          timeZone: Localization.timeZone,
          location: item.LocationName,
          alarms: [{ relativeOffset: -1440 }]
        })
          .then(event => {
            console.log("Created event");
            alert("Event created");
          })
          .catch(error => {
            console.log("Problem creating event: ", error);
            alert("Event could not be created");
          });
      } else {
        //If the user denies permission to edit the calendar, notify the user that they can't create an event
        alert("You must provide access to your calendar to create an event");
        console.log("Permission to edit the calendar was denied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async onChangeText(text) {
    ["categoryName"]
      .map(name => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        this.setState({ [name]: text });
      });
    let categoryId = this.state.categoriesMap.get(this.state.categoryName);
    console.log("Category selected :", categoryId);

    if (categoryId == "0") {
      this.getEvents();
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      try {
        let response = await fetch(
          "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events/filter/" +
            categoryId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: token
            }
          }
        );

        response.json().then(result => {
          console.log(result.data);
          this.setState({ eventsData: result.data, isLoading: false });
        });
      } catch (error) {
        this.setState({ response: error });
        console.log(error);
      }
    } catch (e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
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
            <Text
              style={{
                color: "gray",
                fontSize: 14,
                fontFamily: "Futura-Medium"
              }}
            >
              {item.LocationName}
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 14,
                fontFamily: "Futura-Medium"
              }}
            >
              {format("January 01, 2019 " + item.StartTime, "hh:mm a")}
            </Text>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              justifyContent: "center",
              width: 80,
              height: 40
            }}
          >
            <Text
              style={{ color: "#463077", fontSize: 20, fontFamily: "Futura" }}
            >
              {moment.utc(item.StartDate).format("MMMM DD")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { eventsData, categoryData } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "flex-end" }}>
          <Dropdown
            ref={this.categoryRef}
            label="Filter By"
            data={categoryData}
            containerStyle={{ width: 150 }}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={eventsData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this._renderEvents(item)}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => this.getEvents()}
            refreshing={this.state.isLoading}
          />
        </View>

        <View style={{ position: "absolute", right: 10, bottom: 30 }}>
          <Button
            title="+"
            titleStyle={{ fontSize: 28, height: "120%" }}
            containerStyle={{}}
            buttonStyle={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#463077"
            }}
            onPress={() => this.props.navigation.navigate("createEvent")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8"
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
    flex: 1,
    borderColor: "lightgrey",
    margin: 10,
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    position: "relative",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.1
  }
});

export default withNavigationFocus(EventsScreen);
