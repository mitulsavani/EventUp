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
import { Dropdown } from "react-native-material-dropdown";
import moment from "moment";
import { ImageStore, ImageEditor } from "react-native";
// import RNFS from "react-native-fs";

export const PRIMARY_COLOR = "#FFCC33";

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.locationRef = this.updateRef.bind(this, "locationName");
    this.categoryRef = this.updateRef.bind(this, "categoryName");

    this.state = {
      title: "",
      description: "",
      image: null,
      startDate: new Date(),
      startTime: "",
      endTime: "",
      locationName: "",
      categoryName: "",
      locationData: [],
      categoryData: [],
      imageData: "",
      locationsMap: undefined,
      categoriesMap: undefined,

      checked: false,
      isDatePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false
    };
    this.updatePostField = key => text => this.updatePostFieldState(key, text);
    this.uploadEvent = this.uploadEvent.bind(this);
  }

  onChangeText(text) {
    ["locationName", "categoryName"]
      .map(name => ({ name, ref: this[name] }))
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
    var localTime = new Date(time).toLocaleTimeString();
    localTime = moment(localTime, ["h:mm A"]).format("HH:mm:ss");
    console.log("Start Time :", localTime);
    this.setState({ startTime: localTime });
    this.hideStartTimePicker();
  };

  handleEndTimePicked = time => {
    var localTime = new Date(time).toLocaleTimeString();
    localTime = moment(localTime, ["h:mm A"]).format("HH:mm:ss");
    console.log("End Time :", localTime);
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
      Image.getSize(result, (width, height) => {
        let imageSettings = {
          offset: { x: 0, y: 0 },
          size: { width: width, height: height }
        };
        ImageEditor.cropImage(
          result,
          imageSettings,
          uri => {
            ImageStore.getBase64ForTag(
              uri,
              data => {
                // data == base64 encoded image
                this.setState({ imageData: data });
              },
              e => console.warn("getBase64ForTag: ", e)
            );
          },
          e => console.warn("cropImage: ", e)
        );
      });

      this.setState({ image: result });
    }
  };

  async componentDidMount() {
    var locationNames = new Array();
    var categoryNames = new Array();
    var locationsMap = new Map();
    var categoriesMap = new Map();

    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      try {
        let response = await fetch(
          "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/locations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: token
            }
          }
        );

        response.json().then(result => {
          result.data.forEach(function(location) {
            locationNames.push({ value: location.Name });
            locationsMap.set(location.Name, location.id);
          });
          this.setState({ locationsMap: locationsMap });
          this.setState({ locationData: locationNames });
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
          result.data.forEach(function(category) {
            categoryNames.push({ value: category.Name });
            categoriesMap.set(category.Name, category.id);
          });
          this.setState({ categoriesMap: categoriesMap });
          this.setState({ categoryData: categoryNames });
        });
      } catch (error) {
        this.setState({ response: error });
        console.log(error);
      }
    } catch (e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }
  }

  async uploadEvent() {
    const {
      categoriesMap,
      locationsMap,
      imageData,
      title,
      locationName,
      categoryName,
      description,
      startDate,
      startTime,
      endTime,
      checked
    } = this.state;
    let locationId = locationsMap.get(locationName);
    let categoryId = categoriesMap.get(categoryName);
    let ageRestriction = "0";
    if (checked) {
      ageRestriction = "1";
    }
    console.log("LocationId:", locationId);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      try {
        var formData = new FormData();
        formData.append("Name", title);
        formData.append("Description", description);
        formData.append("AgeRestriction", ageRestriction);
        formData.append("UserId", userId);
        formData.append("CategoryId", categoryId);
        formData.append("LocationId", locationId);
        formData.append("Image", imageData);
        formData.append("StartDate", startDate);
        formData.append("StartTime", startTime);
        formData.append("EndTime", endTime);

        let response = await fetch(
          "http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events",
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data; charset=utf-8",
              Authorization: token
            },

            body: formData
          }
        );

        response.json().then(result => {
          if (result.status) {
            Alert.alert(
              "Alert!",
              "Event Created Successfully",
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("events")
                }
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Alert!",
              "Please Fill out All the Fields",
              [{ text: "OK" }],
              { cancelable: false }
            );
          }
        });
      } catch (error) {
        this.setState({ loading: false, response: error });
        console.log(error);
        Alert.alert(
          "Alert!",
          "Failed to Create an Event",
          [
            {
              text: "OK",
              onPress: () => console.log("Failed to Create an Event")
            }
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      console.log("AsyncStorage failed to retrieve token:", e);
    }
  }

  render() {
    let { image, locationData, categoryData } = this.state;

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
              label="Location"
              data={locationData}
              onChangeText={this.onChangeText}
            />

            <Dropdown
              ref={this.categoryRef}
              label="Category"
              data={categoryData}
              onChangeText={this.onChangeText}
            />

            <TextInput
              mode="outlined"
              style={{ marginBottom: 10, height: 200 }}
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
              <Text style={{ paddingTop: 30, paddingRight: 85, fontSize: 18 }}>
                Date :
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 20,
                  paddingLeft: 10,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "black"
                }}
                onPress={this.showDatePicker}
              >
                {format(this.state.startDate, "MMMM D, YYYY")}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingTop: 30, paddingRight: 75, fontSize: 18 }}>
                Start Time :
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 20,
                  paddingLeft: 10,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "black"
                }}
                onPress={this.showStartTimePicker}
              >
                {format("January 01, 2019 " + this.state.startTime, "hh:mm a")}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingTop: 30, paddingRight: 85, fontSize: 18 }}>
                End Time :
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 20,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "black"
                }}
                onPress={this.showEndTimePicker}
              >
                {format("January 01, 2019 " + this.state.endTime, "hh:mm a")}
              </Text>
            </View>

            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
              is24Hour={false}
              mode={"date"}
            />

            <DateTimePicker
              isVisible={this.state.isStartTimePickerVisible}
              onConfirm={this.handleStartTimePicked}
              onCancel={this.hideStartTimePicker}
              is24Hour={false}
              mode={"time"}
            />

            <DateTimePicker
              isVisible={this.state.isEndTimePickerVisible}
              onConfirm={this.handleEndTimePicked}
              onCancel={this.hideEndTimePicker}
              is24Hour={false}
              mode={"time"}
            />

            <CheckBox
              center
              title="18+ Only"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onIconPress={() =>
                this.setState({ checked: !this.state.checked })
              }
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
                buttonStyle={{
                  marginTop: 30,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: PRIMARY_COLOR
                }}
                titleStyle={{ color: "#330033" }}
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
              titleStyle={{ fontSize: 20, marginTop: 5, color: "#330033" }}
              containerStyle={{ marginTop: 20, marginBottom: 30 }}
              buttonStyle={{
                marginTop: 30,
                height: 50,
                borderRadius: 5,
                backgroundColor: PRIMARY_COLOR
              }}
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
