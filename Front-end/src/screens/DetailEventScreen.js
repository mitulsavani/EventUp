import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import moment from "moment";
import { format } from "date-fns";
import MapView, { Marker } from 'react-native-maps';
import openMap, { createOpenLink } from 'react-native-open-maps';

export default class DetailEventScreen extends React.Component {
  static navigationOptions = {
    title: "EVENT",
    headerStyle: {
      backgroundColor: "#39CA74",
      borderBottomWidth: 0
    },
    headerTintColor: "#FFF"
  };

  constructor(props) {
    super(props);
    const event = props.navigation.state.params.item;
    this.state = {
      event: event || null,
      isLoading: false
    };
  }

  async componentDidMount() {
    const { event, isLoading } = this.state;

    this.setState({ isLoading: true });
    if (event === null) {
      Alert.alert(
        "Unable to display Post!",
        "Please try again later",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ isLoading: false });
      console.log("HERE", event);
    }
  }

  onTicketButtonPress = () => {
    console.log("button pressed");
  };

  loadingView = () => {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  contentView = () => {
    const { isLoading, event } = this.state;

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.bannerImageContainer}>
            <Image
              source={require("../img/sample_image.jpg")}
              style={{
                flex: 1,
                height: 200,
                width: "100%"
              }}
              resizeMode="cover"
            />
          </View>
          {/* bannerImageContainer End */}

          <View style={styles.generalInformationContainer}>
            <Text style={styles.generalInformationHeaderTitleStyle}>
              {event.Name}
            </Text>
            <Text style={styles.byTextStyle}>{event.CategoryName}</Text>

            <View style={styles.detailContainer}>
              <SimpleLineIcons name="calendar" size={25} />
              <View style={styles.subDetailColumnContainer}>
                <Text style={styles.detailMainText}>
                  {moment.utc(event.StartDate).format("MMMM DD")}
                </Text>
                <Text style={styles.detailSubText}>
                  {format("January 01, 2019 " + event.StartTime, "hh:mm a")}
                </Text>
              </View>
            </View>

            <View style={styles.detailContainer}>
              <SimpleLineIcons name="location-pin" size={25} />
              <View style={styles.subDetailColumnContainer}>
                <Text style={styles.detailMainText}>{event.LocationName}</Text>
                {/* <Text style={styles.detailSubText}>{event.venue.address}</Text> */}
              </View>
            </View>

            <View style={styles.detailContainer}>
              <SimpleLineIcons name="tag" size={25} />
              <View style={styles.subDetailColumnContainer}>
                <Text style={styles.detailMainText}>Free</Text>
                <Text style={styles.detailSubText}>on EventUp</Text>
              </View>
            </View>
          </View>
          {/* generalInformationContainer End */}

          <View style={styles.aboutEventContainer}>
            <Text style={styles.aboutTitleStyle}>About</Text>
            <Text
              style={styles.descriptionStyle}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {event.Description}
            </Text>
          </View>
          {/* aboutEventContainer End */}

          <View style={styles.locationContainer}>
            <Text style={styles.locationTitleStyle}>Location</Text>
            <Text style={styles.locationSubTitleStyle}>
              {event.LocationName}
            </Text>
            <View style={styles.mapImageContainer}>
            <MapView
              style={{flex: 1}}
              region={{
                latitude: 42.882004,
                longitude: 74.582748,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              showsUserLocation={true}
            >
            <MapView.Marker
                coordinate= {
                  {latitude: 42.882004,
                  longitude: 74.582748}
                }
                onPress= { createOpenLink({ latitude: 42.882004, longitude: 74.582748}) }
            />
            </MapView>
            </View>
          </View>
          {/* locationContainer End */}
        </ScrollView>
        <View style={styles.purchaseContainer}>
          <TouchableOpacity>
            <Button
              onPress={() => this.onTicketButtonPress()}
              title="RSVP"
              buttonStyle={styles.rsvpButton}
              rounded
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.mainContainer}>
        {isLoading ? this.loadingView() : this.contentView() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },

  scrollViewContainer: {
    flexGrow: 1
  },

  bannerImageContainer: {
    flex: 1,
    width: "100%",
    height: 200
  },
  // banner end

  generalInformationContainer: {
    flex: 2,
    width: "100%",
    height: 375
  },
  generalInformationHeaderTitleStyle: {
    fontSize: 25,
    textAlign: "left",
    marginTop: 30,
    marginLeft: 15
  },
  byTextStyle: {
    fontSize: 15,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 15
  },
  detailContainer: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  },
  subDetailColumnContainer: {
    marginLeft: 20
  },
  detailMainText: {
    marginBottom: 5
  },
  detailSubText: {
    color: "gray"
  },
  // general information end

  aboutEventContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: 200
  },
  aboutTitleStyle: {
    fontSize: 15,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15
  },
  descriptionStyle: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15
  },
  // about event end

  locationContainer: {
    flex: 2,
    width: "100%",
    height: 400
  },
  locationTitleStyle: {
    fontSize: 15,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15
  },
  locationSubTitleStyle: {
    fontSize: 15,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    fontWeight: "bold"
  },
  mapImageContainer: {
    padding: 10,
    width: "100%",
    height: 200
  },
  // location information end
  
  purchaseContainer: {
    width: "100%",
    height: 50,
    alignItems: "center"
  },

  rsvpButton: {
    width: 250,
    borderRadius: 5,
    backgroundColor: "#E8787B"
  }
  
});
