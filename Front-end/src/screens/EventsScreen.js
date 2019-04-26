import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Share
} from "react-native";
import { Button } from "react-native-elements";
import { format } from "date-fns";

export default class EventsScreen extends React.Component {
  static navigationOptions = {
      title: "Events",
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white"
      },
      headerStyle: {
        backgroundColor: "#39CA74"
      },
  };

  constructor(props) {
    super(props);

    this.state = {
      eventsData: [],
      isLoading: false,
      error: null
    };
  }


  async componentDidMount() {
    //console.log("TODAY : ", new Date().toLocaleTimeString());
    this.setState({ isLoading: true });
    try {
      let response = await fetch(
        "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTYyMzkzNzcsImV4cCI6MTU1NjMyNTc3N30.PNBXvzOCB1Kky0STb5ILyGIgPbxS8FMkjUc_sFNEIGU"
          }
        }
      );
      
      response.json().then(result => {
      this.setState({ eventsData: result.data });
      console.log(this.state.eventsData)
      });
    } catch (error) {
      this.setState({ loading: false, response: error });
      console.log(error);
    }
  }

  onShare = async (item, name, time) => {
    const str = 'Event name: ' + name + '. Time: ' + time + '.';
    try {
      const result = await Share.share({
        title: 'Checkout this event from EventUp',
        message: str
      });
    } catch(error) {
      alert(error.message)
    }
  }

  _rendeEvents = (item) => {
    return(
    <View style={{ flexDirection: "row", paddingTop: 30 }}>
      <Image
        source={require("../img/image1.jpg")}
        style={styles.imageEx}
      />
      <View style={{ flex: 1, paddingLeft: 30 }}>
        <Text style={styles.titleStyling}>{item.Name}</Text>
        <Text style={{color: '#333'}}>
          {format(item.StartDate,"MMMM D")}{" | "}
          {format("January 01, 2019 "+item.StartTime,"hh:mm a")}
        </Text>
        <Text style={{color: '#333'}}>{item.LocationName}</Text>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', alignSelf: 'flex-end', padding: 10}}>
          <Button
            title="RSVP"
            type='outline'
            titleStyle={{ fontSize: 12, color: '#E8787B' }}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyling}
            onPress={() => console.log("RSVP pressed")}
          />
          <Button
            title="Share"
            type='outline'
            titleStyle={{ fontSize: 12, color: '#E8787B' }}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyling}
            onPress={()=>this.onShare(item, item.Name, item.StartTime)}
          />
        </View>
      </View>
    </View>
    )
  }

  render() {
    const { eventsData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={eventsData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", paddingTop: 30 }}>
                <View>
                  <Image
                    source={require("../img/image1.jpg")}
                    style={styles.imageEx}
                  />
                </View>
                <View style={{ flex: 1, paddingLeft: 30 }}>
                  <Text style={styles.name}>{item.Name}</Text>
                  <Text style={styles.email}>
                   {format(item.StartDate,"MMMM D")}{" | "}
                    {format("January 01, 2019 "+item.StartTime,"hh:mm a")}
                  </Text>
                  <Text style={styles.email}>{item.LocationName}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      title="RSVP"
                      titleStyle={{ fontSize: 12 }}
                      containerStyle={{
                        marginTop: 20,
                        marginBottom: 30,
                        marginLeft: 40
                      }}
                      buttonStyle={{
                        width: 60,
                        height: 40,
                        borderRadius: 5,
                        backgroundColor: "#39CA74"
                      }}
                      activeOpacity={0.8}
                      onPress={() => console.log("Reset Password")}
                    />
                    <Button
                      title="Share"
                      titleStyle={{ fontSize: 12 }}
                      containerStyle={{
                        marginTop: 20,
                        marginBottom: 30,
                        marginLeft: 20
                      }}
                      buttonStyle={{
                        width: 60,
                        height: 40,
                        borderRadius: 5,
                        backgroundColor: "#39CA74"
                      }}
                      activeOpacity={0.8}
                      onPress={() =>
                        this.props.navigation.navigate("detailEvent")
                      }
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.email}
          />
        </View>
        <View style={{ position: "absolute", left: 290, right: 0, bottom: 30 }}>
          <Button
            title="Create"
            titleStyle={{ fontSize: 12 }}
            containerStyle={{}}
            buttonStyle={{
              width: 60,
              height: 40,
              borderRadius: 5,
              backgroundColor: "#39CA74"
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
    marginTop: 0,
    marginLeft: 20,
    backgroundColor: "#FFFFFF"
  },
  imageEx: {
    width: 120,
    height: 120
  },
  titleStyling: {
    fontFamily: "Verdana",
    fontSize: 18,
    marginBottom: 5
  },
  buttonStyling: {
    width: 60,
    height: 40,
    borderRadius: 5,
    borderColor: 'grey',
  }
});
