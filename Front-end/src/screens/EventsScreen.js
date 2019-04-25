import React from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';


export default class EventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
    },
    headerStyle: {
      backgroundColor: '#39CA74',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      eventsData: [],
      isLoading: false,
      error: null,
    };
  }


async componentDidMount() {
  this.setState({ isLoading: true });
//   try {
//     let response = await fetch('http://localhost:5200/eventsData');
//     let responseJsonData = await response.json();
//     this.setState({
//       eventsData: responseJsonData,
//       isLoading: false
//     })
//     return responseJsonData;
// }
// catch(e) {
// console.log(e)
// }

try {
  let response = await fetch('http://ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/events', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTYxNDE5NzEsImV4cCI6MTU1NjIyODM3MX0.jprhNI6yj9rJrJFO-61aYnlWxFwM3Air3zgtCOvQ_Mc'
  },
});

response.json().then(result => {
// console.log("Fetched this data : ",result);
for(eventObj of result.data) {
  if(eventObj.Image != null) {
  console.log("OBBJJJECT" , JSON.stringify(eventObj.Image) );
  }
}

 this.setState({eventsData:result.data});



})
} catch (error) {
this.setState({ loading: false, response: error });
console.log(error);
}


}




render() {
  return (
    <View style={{flex: 1}}>
  <View style={styles.container} >
 
        <FlatList
        data={this.state.eventsData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
         <View style={{flexDirection:"row", paddingTop:30}}>
         
         <View>
        <Image source = {require('../img/image1.jpg')} style = {styles.imageEx}   />
        </View>
        <View style={{flex:1, paddingLeft: 30}}>
          <Text style={styles.name}>{item.Name}</Text>
          <Text style={styles.email}>{item.StartDate}{' | '}{item.StartTime}</Text>
          <Text style={styles.email}>{item.LocationId}</Text>
          <View style={{flexDirection:"row"}}>
          <Button
            title="RSVP"
            titleStyle={{ fontSize: 12}}
            containerStyle={{ marginTop: 20, marginBottom: 30, marginLeft:40 }}
            buttonStyle={{ width: 60, height: 40, borderRadius: 5, backgroundColor: '#39CA74'}}
            activeOpacity={0.8}
            onPress={() => console.log('Reset Password')}
          />
          <Button
            title="Share"
            titleStyle={{ fontSize: 12 }}
            containerStyle={{ marginTop: 20, marginBottom: 30, marginLeft:20 }}
            buttonStyle={{ width: 60, height: 40, borderRadius: 5, backgroundColor: '#39CA74'}}
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('detailEvent')}
            
          />
          </View>
        </View>
     
        </View>
        
        }
        keyExtractor={item => item.email}
      />

      
         
    </View>

<View style={{position: 'absolute', left: 290, right: 0, bottom: 30}}>
<Button
            title="Create"
            titleStyle={{ fontSize: 12 }}
            containerStyle={{ }}
            buttonStyle={{ width: 60, height: 40, borderRadius: 5, backgroundColor: '#39CA74'}}
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('createEvent')}
            
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
  
  backgroundColor: '#FFFFFF',
},
imageEx: {
width : 120,
height: 120,
},
h2text: {
  marginTop: 10,
  fontFamily: 'Helvetica',
  fontSize: 36,
  fontWeight: 'bold',
},
flatview: {
  justifyContent: 'center',
  paddingTop: 30,
  borderRadius: 2,
},
name: {
  fontFamily: 'Verdana',
  fontSize: 18,
  marginBottom:5,
},
email: {
  color: 'gray'
}

});
