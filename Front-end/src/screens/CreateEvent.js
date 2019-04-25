import React from 'react';
import { AsyncStorage, Image, TouchableOpacity, DatePickerIOS, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { ImagePicker, Permissions } from 'expo';


export default class CreateEvent extends React.Component {



  constructor(props) {
    super(props);
   
    this.state = {
      name: '',
      description: '',
      ageRestriction: '1',
      userId: 'sampleUserId',
      categoryId: 'sampleCategoryId',
      locationId: '',
      image: null,
      startDate: '',
      startTime: '',
      endTime: '',
  
      checked : null,
    }
    this.updatePostField = key => text => this.updatePostFieldState(key, text);
    this.uploadEvent = this.uploadEvent.bind(this);
}

toggleAgeRestriction() {

}

updatePostFieldState(key, value) {
  this.setState({ [key]: value });
}

_pickImage = async () => {
  await Permissions.askAsync(Permissions.CAMERA_ROLL)
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log("IMAGEGGEG : ",result);

  if (!result.cancelled) {
    this.setState({ image: result });
  }
};


async uploadEvent() {

  try {
    let response = await fetch('http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTYwMzYxODgsImV4cCI6MTU1NjEyMjU4OH0.FTP2jcagh20lyl00c8e4fjeGF2yULtxnvyZey47U7GM'
    },
    body: 
    JSON.stringify({
      "Name" : this.state.name,
      "Description" : this.state.description,
      "AgeRestriction" : "1",
      "UserId":"sampleUserId",
      "CategoryId" : "1",
      "LocationId":this.state.locationId,
      "Image":null,
      "StartDate": this.state.startDate,
      "StartTime": this.state.startTime,
      "EndTime": this.state.endTime,
  })
  });
  
  response.json().then(result => {
   
   this.setState({users:result.data});
  
  })
  } catch (error) {
  this.setState({ loading: false, response: error });
  console.log(error);
  }
  
}


  render() {
    let { image } = this.state;

    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <View style={{ flex: 1, justifyContent: 'center' }}>
        
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Title"
            placeholder="Enter your email"
            
            //theme={{ colors: { primary: PRIMARY_COLOR } }}
            
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"            
            onChangeText={this.updatePostField('name')}
            
          />
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Location"
            placeholder="Enter your password"
            
           // theme={{ colors: { primary: PRIMARY_COLOR } }}            
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"

            onChangeText={this.updatePostField('locationId')}
          />
     
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10, height:200, position:'fixed' }}
            label="Description"
            multiline={true}
            numberOfLines={4}
            placeholder="Enter your password"
            
           // theme={{ colors: { primary: PRIMARY_COLOR } }}                      
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"           
            onChangeText={this.updatePostField('description')}
          />
          
          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            label="Date"
            placeholder="Enter your password"
            
           // theme={{ colors: { primary: PRIMARY_COLOR } }}            
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            onChangeText={this.updatePostField('startDate')}
          />
          <View style={{flexDirection:"row"}}>
          <TextInput
            mode="outlined"
            style={{width: 100, marginBottom: 10 }}
            label="Start Time"
            placeholder="Enter your password"
            
           // theme={{ colors: { primary: PRIMARY_COLOR } }}            
            
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            onChangeText={this.updatePostField('startTime')}
            
          />
          <TextInput
            mode="outlined"
            style={{width: 100, marginHorizontal: 20, marginBottom: 10 }}
            label="End Time"
            placeholder="Enter your password"
            
           // theme={{ colors: { primary: PRIMARY_COLOR } }}            
            
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit={false}
            underlineColorAndroid="transparent"            
            onChangeText={this.updatePostField('endTime')}
           
          />
          </View>
          <CheckBox
          center
          title='18+ Only'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onIconPress={this.toggleAgeRestriction}
          checked={this.state.checked}
        />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
       {image &&
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
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
    backgroundColor: '#fff',
  
    marginHorizontal: 30,
    marginTop: 40
  },
});
