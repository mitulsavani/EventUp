import React from "react";
import {
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Share
} from "react-native";
import { Button } from "react-native-elements";
import { format } from "date-fns";
import moment from "moment";

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
    
    this.setState({ isLoading: true });
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

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
      this.setState({ eventsData: result.data });      
      });
    } catch (error) {
      this.setState({ loading: false, response: error });
      console.log(error);
    }
  }
    catch(e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }


  }

  onShare = async (item, name, time) => {
    const str = 'Event name: ' + name + '. Time: ' + format("January 01, 2019 "+item.StartTime,"hh:mm a") + '.';
    try {
      const result = await Share.share({
        title: 'Checkout this event from EventUp',
        message: str
      });
    } catch(error) {
      alert(error.message)
    }
  }

  _renderEvents = (item) => {
    return(
    <View style={{ flexDirection: "row", paddingTop: 30 }}>
      <Image
        source={require("../img/sample_image.jpg")}
        style={styles.imageEx}
      />
      <View style={{ flex: 1, paddingLeft: 30 }}>
        <Text style={styles.titleStyling}>{item.Name}</Text>
        <Text style={{color: '#333'}}>
        {moment.utc(item.StartDate).format("MMMM DD")}{" | "}
          {format("January 01, 2019 "+item.StartTime,"hh:mm a")}
        </Text>
        <Text style={{color: '#333'}}>{item.LocationName}</Text>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', alignSelf: 'flex-end', padding: 10}}>
          <Button
            title="RSVP"
            type='outline'
            titleStyle={{ fontSize: 12, color: 'white' }}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyling}
            onPress={() => console.log("RSVP pressed")}
          />
          <Button
            title="Share"
            type='outline'
            titleStyle={{ fontSize: 12, color: 'white' }}
            containerStyle={{
                        marginTop: 20,
                        marginBottom: 30,
                        marginLeft: 20
                      }}
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
            renderItem={({ item }) => this._renderEvents(item)}
            keyExtractor={(item, index) => index.toString()}
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

  buttonContainerStyle: {
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 40
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
    backgroundColor: '#39CA74',
  }
});
