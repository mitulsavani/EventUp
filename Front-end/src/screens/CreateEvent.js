import React from "react";
import {
  AsyncStorage,
  Image,
  TouchableOpacity,
  DatePickerIOS,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar
} from "react-native";
import { CheckBox, Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { ImagePicker, Permissions } from "expo";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from "date-fns";

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      ageRestriction: "1",
      userId: "1",
      categoryId: "1",
      locationId: "",
      image: null,
      startDate: "",
      startTime: "",
      endTime: "",

      checked: null,
      isDatePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false

    };
    this.updatePostField = key => text => this.updatePostFieldState(key, text);
    this.uploadEvent = this.uploadEvent.bind(this);
  }

  toggleAgeRestriction() {}

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
    var formattedDate = new Date(date).toLocaleDateString();
    formattedDate = format(date, "YYYY-MM-DD");
    console.log("DATE L ", formattedDate);
    this.setState({ startDate: formattedDate });
    this.hideDatePicker();
  };

  handleStartTimePicked = time => {
    var localTime = new Date (time).toLocaleTimeString();    
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
    const { title, description, startDate, startTime, endTime } = this.state;
    
    // try {
    //   let response = await fetch(
    //     "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //         Authorization:
    //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTYyMzkzNzcsImV4cCI6MTU1NjMyNTc3N30.PNBXvzOCB1Kky0STb5ILyGIgPbxS8FMkjUc_sFNEIGU"
    //       },

    //       body: JSON.stringify({
    //         Name: title,
    //         Description: description,
    //         AgeRestriction: "1",
    //         UserId: "1",
    //         CategoryId: "1",
    //         LocationId: this.state.locationId,
    //         Image: null,
    //         StartDate: startDate,
    //         StartTime: startTime,
    //         EndTime: endTime
    //       })
    //     }
    //   );

    //   response.json().then(result => {
    //     console.log(result);
    //   });
    // } catch (error) {
    //   this.setState({ loading: false, response: error });
    //   console.log(error);
    // }
  }

  render() {
    let { image } = this.state;

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
              //theme={{ colors: { primary: PRIMARY_COLOR } }}
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              underlineColorAndroid="transparent"
              onChangeText={this.updatePostField("title")}
            />
            <TextInput
              mode="outlined"
              style={{ marginBottom: 10 }}
              label="Location"
              placeholder="Enter Location"
              // theme={{ colors: { primary: PRIMARY_COLOR } }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              blurOnSubmit={false}
              underlineColorAndroid="transparent"
              onChangeText={this.updatePostField("locationId")}
            />

            <TextInput
              mode="outlined"
              style={{ marginBottom: 10, height: 200, position: "fixed" }}
              label="Description"
              multiline={true}
              numberOfLines={4}
              placeholder="Enter Description"
              // theme={{ colors: { primary: PRIMARY_COLOR } }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              blurOnSubmit={false}
              underlineColorAndroid="transparent"
              onChangeText={this.updatePostField("description")}
            />

            <TextInput //Replaced this with a pick a date button
              mode="outlined"
              style={{ marginBottom: 10 }}
              label="Date"
              placeholder="Enter Date"
              // theme={{ colors: { primary: PRIMARY_COLOR } }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              blurOnSubmit={false}
              underlineColorAndroid="transparent"
              onChangeText={this.updatePostField("startDate")}
            />
            <View style={{ flexDirection: "row" }}>
            <Text onPress={this.showStartTimePicker}>
              {format("January 01, 2019 "+this.state.startTime,"hh:mm a")}
            </Text>

              <TextInput
                mode="outlined"
                style={{ width: 100, marginHorizontal: 20, marginBottom: 10 }}
                label="End Time"
                placeholder="Enter End Time"
                // theme={{ colors: { primary: PRIMARY_COLOR } }}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={false}
                underlineColorAndroid="transparent"
                onChangeText={this.updatePostField("endTime")}
              />
            </View>
            <CheckBox
              center
              title="18+ Only"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onIconPress={this.toggleAgeRestriction}
              checked={this.state.checked}
            />

            <Button title="Pick a Date" onPress={this.showDatePicker} />
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
              is24Hour= {false}
              mode={"date"}
            />

            <Button title="Pick a Start Time" onPress={this.showStartTimePicker} />
            <DateTimePicker
              isVisible={this.state.isStartTimePickerVisible}
              onConfirm={this.handleStartTimePicked}
              onCancel={this.hideStartTimePicker}
              is24Hour= {false}
              mode={"time"}
            />

            <Button title="Pick an End Time" onPress={this.showEndTimePicker} />
            <DateTimePicker
              isVisible={this.state.isEndTimePickerVisible}
              onConfirm={this.handleEndTimePicked}
              onCancel={this.hideEndTimePicker}
              is24Hour= {false}
              mode={"time"}
            />

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                title="Pick an image from camera roll"
                onPress={this._pickImage}
              />
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>

            <Button
              title="Post"
              titleStyle={{ fontSize: 20, marginTop: 5 }}
              containerStyle={{ marginTop: 20, marginBottom: 30 }}
              buttonStyle={{ height: 50, borderRadius: 5 }}
              activeOpacity={0.8}
              //disabled={!enabled}
              //loading={loading}
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
