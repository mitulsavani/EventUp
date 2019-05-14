import React from "react";
import {
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Share
} from "react-native";
import { Avatar, Icon, Divider } from "react-native-elements";
import { format } from "date-fns";
import moment from "moment";

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Profile",
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white"
      },
      headerStyle: {
        backgroundColor: "#39CA74"
      },
      headerRight: (
        <TouchableOpacity onPress={() => params.handleSignOut()}>
          <Icon
            name="sign-out"
            type="octicon"
            color="#fff"
            iconStyle={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      eventsData: [],
      firstName: "",
      lastName: "",
      isLoading: false,
      error: null
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.props.navigation.setParams({ handleSignOut: this._signOutAsync });

    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      try {
        let response = await fetch(
          "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/users/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: token
            },
            body: JSON.stringify({
              UserId: "35"
            })
          }
        );

        response.json().then(result => {
          this.setState({ eventsData: result.data });
        });
      } catch (error) {
        this.setState({ loading: false, response: error });
        console.log(error);
      }
      var url =
        "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/users/" +
        userId;

      try {
        let response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token
          }
        });

        response.json().then(result => {
          this.setState({ firstName: result.UserCount[0].FirstName });
          this.setState({ lastName: result.UserCount[0].LastName });
        });
      } catch (error) {
        this.setState({ loading: false, response: error });
        console.log(error);
      }
    } catch (e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  _renderEvents = item => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        key={item}
        onPress={() => this.props.navigation.navigate("detailEvent", { item })}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: "row", paddingTop: 30 }}>
          <Image
            source={require("../img/sample_image.jpg")}
            style={styles.imageEx}
          />
          <View style={{ flex: 1, paddingLeft: 30 }}>
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
    const { eventsData, firstName, lastName } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Avatar
            size="large"
            rounded
            title={firstName.substring(0, 1) + lastName.substring(0, 1)}
            marginTop={30}
            marginBottom={30}
          />
          <Text style={styles.nameTitle}>
            {firstName} {lastName}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.baseText}>My Events</Text>
          <Divider style={{ backgroundColor: "black", marginTop: 10, marginBottom: 15, height: 1.5, width: 120 }} />
          <FlatList
            data={eventsData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this._renderEvents(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameTitle: {
    fontSize: 18,
    marginBottom: 30,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "500"
  },

  baseText: {
    fontSize: 25,
    fontWeight: "bold"
  },

  container: {
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: "#FFFFFF"
  },
  imageEx: {
    width: 120,
    height: 120
  },

  buttonContainerStyle: {
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 40
  },

  titleStyling: {
    fontSize: 18,
    marginBottom: 5
  },
  buttonStyling: {
    width: 60,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#39CA74"
  }
});
