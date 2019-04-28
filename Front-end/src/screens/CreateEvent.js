import React from "react";
import {
  Alert,
  AsyncStorage,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import { CheckBox, Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { ImagePicker, Permissions } from "expo";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { Dropdown } from 'react-native-material-dropdown';

export const PRIMARY_COLOR = '#39CA74';

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.locationRef = this.updateRef.bind(this, 'locationName');
    this.categoryRef = this.updateRef.bind(this, 'categoryName');

    this.state = {
      title: "",
      description: "",      
      image: null,
      startDate: new Date(),
      startTime: "",
      endTime: "",
      locationName:"",
      categoryName:"",

      checked: false,
      isDatePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false

    };
    this.updatePostField = key => text => this.updatePostFieldState(key, text);
    this.uploadEvent = this.uploadEvent.bind(this);
  }

  onChangeText(text) {
    ['locationName', 'categoryName']
      .map((name) => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        this.setState({ [name]: text });
      });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  showStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: true });
  };

  showEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  hideStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: false });
  };

  hideEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("Date Picker :", date);
    var formattedDate = new Date(date).toLocaleDateString();
    console.log("Format Date Picker :", formattedDate);
    formattedDate = format(date, "YYYY-MM-DD");

    this.setState({ startDate: formattedDate });
    this.hideDatePicker();
  };

  handleStartTimePicked = time => {
    var localTime = new Date (time).toLocaleTimeString();    
    console.log("Start Time :", localTime);
    this.setState({ startTime: localTime });
    this.hideStartTimePicker();
  };

  handleEndTimePicked = time => {
    var localTime = new Date (time).toLocaleTimeString();  
    this.setState({ endTime: localTime });
    this.hideEndTimePicker();
  };


  updatePostFieldState(key, value) {
    this.setState({ [key]: value });
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };

  async uploadEvent() {
    const { title, locationName, categoryName, description, startDate, startTime, endTime, checked } = this.state;
    let locationId = "1";
    let categoryId = "1";
    let ageRestriction = "0"
    if (checked) {
      ageRestriction = "1";
    }
console.log("Time :", startTime);

    if (locationName == "J Paul Leonard Library") {
      locationId = "1";
    } else if (locationName == "Thornton Hall") {
      locationId = "2";
    } else if (locationName == "Hensil Hall") {
      locationId = "3";
    }

    if (categoryName == "") {
      categoryId = "1";
    } else if (categoryName == "") {
      categoryId = "2";
   } else if (categoryName == "") {
      categoryId = "3";
   }


   try {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    try {
      let response = await fetch(
        "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization:
              token
          },

          body: JSON.stringify({
            Name: title,
            Description: description,
            AgeRestriction: ageRestriction,
            UserId: userId,
            CategoryId: categoryId,
            LocationId: locationId,
            Image: null,
            StartDate: startDate,
            StartTime: startTime,
            EndTime: endTime
          })
        }
      );

      response.json().then(result => {
        
        console.log(result);
        Alert.alert(
          'Alert!',
          'Event Created Successfully',
          [
            { text: 'OK', onPress: () => console.log('Event Created') }
          ],
          { cancelable: false }
        );
      });
    } catch (error) {
      this.setState({ loading: false, response: error });      
      console.log(error);
      Alert.alert(
        'Alert!',
        'Failed to Create an Event',
        [
          { text: 'OK', onPress: () => console.log('Failed to Create an Event') }
        ],
        { cancelable: false }
      );
    }
  } catch(e) {
    console.log("AsyncStorage failed to retrieve token:", e);
  }
  }

  render() {
    let { image} = this.state;
    let locationData = [{
      value: 'J Paul Leonard Library',
    }, {
      value: 'Thornton Hall',
    }, {
      value: 'Hensil Hall',
    }];

    let categoryData = [{
      value: 'Study Group',
    }, {
      value: 'Health & Wellness',
    }, {
      value: 'Social',
    }];

    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />

          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              mode="outlined"
              style={{ marginBottom: 10 }}
              label="Title"
              placeholder="Enter Title"
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              underlineColorAndroid="transparent"
              onChangeText={this.updatePostField("title")}
            />

      <Dropdown
        ref={this.locationRef}
        label='Location'  
        data={locationData}
        onChangeText={this.onChangeText}
      />

      <Dropdown
        ref={this.categoryRef}
        label='Category'
        data={categoryData}
        onChangeText={this.onChangeText}
      />

            <TextInput
              mode="outlined"
              style={{ marginBottom: 10, height: 200, position: "fixed" }}
              label="Description"
              multiline={true}
              numberOfLines={4}
              placeholder="Enter Description"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              blurOnSubmit={false}
              underlineColorAndroid="transparent"
              onChangeText={this.updatePostField("description")}
            />

            <View style={{ flexDirection: "row" }}>
            <Text style={{paddingTop: 30,paddingRight: 85, fontSize:18}}>
              Date :
            </Text>
            <Text style={{fontSize:18, marginTop:20, paddingLeft:10, paddingTop:10,paddingRight:10,paddingBottom:10, borderWidth:1, borderRadius:10, borderColor:'black'}} onPress={this.showDatePicker}>
              {format(this.state.startDate,"MMMM D, YYYY")}
            </Text>      
            </View>

            <View style={{ flexDirection: "row" }}>
            <Text style={{paddingTop: 30,paddingRight: 75, fontSize:18}}>
              Start Time :
            </Text>
            <Text style={{fontSize:18, marginTop:20, paddingLeft:10, paddingTop:10,paddingRight:10,paddingBottom:10, borderWidth:1, borderRadius:10, borderColor:'black'}} onPress={this.showStartTimePicker}>
              {format("January 01, 2019 "+this.state.startTime,"hh:mm a")}
            </Text>      
            </View>

            <View style={{ flexDirection: "row" }}>
            <Text style={{paddingTop: 30,paddingRight: 85, fontSize:18}}>
              End Time :
            </Text>
            <Text style={{fontSize:18, marginTop:20, marginBottom:20, paddingLeft:10, paddingTop:10,paddingRight:10,paddingBottom:10, borderWidth:1, borderRadius:10, borderColor:'black'}} onPress={this.showEndTimePicker}>
              {format("January 01, 2019 "+this.state.endTime,"hh:mm a")}
            </Text>      
            </View>

            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
              is24Hour= {false}
              mode={"date"}
            />

            <DateTimePicker
              isVisible={this.state.isStartTimePickerVisible}
              onConfirm={this.handleStartTimePicked}
              onCancel={this.hideStartTimePicker}
              is24Hour= {false}
              mode={"time"}
            />

            <DateTimePicker
              isVisible={this.state.isEndTimePickerVisible}
              onConfirm={this.handleEndTimePicked}
              onCancel={this.hideEndTimePicker}
              is24Hour= {false}
              mode={"time"}
            />
            
            <CheckBox              
              center
              title="18+ Only"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onIconPress={() => this.setState({checked: !this.state.checked})}
              checked={this.state.checked}
            />

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                title="Pick an image for the event"
                onPress={this._pickImage}
                buttonStyle={{ marginTop: 30, height: 50, borderRadius: 5, backgroundColor: PRIMARY_COLOR }}
              />
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>

            <Button
              title="Create Event"
              titleStyle={{ fontSize: 20, marginTop: 5 }}
              containerStyle={{ marginTop: 20, marginBottom: 30 }}
              buttonStyle={{ marginTop: 30, height: 50, borderRadius: 5, backgroundColor: PRIMARY_COLOR }}
              activeOpacity={0.8}
              onPress={this.uploadEvent}
            />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 30,
    marginTop: 40
  }
});