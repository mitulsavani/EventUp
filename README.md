<p align="center">
<a href="https://github.com/csc667-02-sp19/csc667-sp19-Team04">
<img alt="EventUp" src="https://github.com/mitulsavani/EventUp/blob/master/Front-end/assets/sfsulogo.png" width="250">
</a>
</p>

<h3 align="center">
EventUp mobile app
</h3>

<p align="center">
EventsUp is a Social Media App for Events
</p>

## What's EventUp?


Event Up is a social media app for events which is accessible in both platforms i.e. iOS and Android. This app can be used by any university student to post, browse, and RSVP for events around campus.

- User **sign up or login** using their university email.
- User can **browse, post, share, and RSVP events** on EventsUp.
- They can also **comment** on any events for host to repond to their questions.

### [Demo - Try it on Expo](https://exp.host/@mitulsavani/Front-end)
![EventUp_demo](https://github.com/mitulsavani/EventUp/blob/master/Front-end/assets/%20eventup.gif)


## Functionality
- EventUp is a fully functioning Social Media app for Events
- Users can Sign up & Log into the app
- Users can create a new Posts
- Users can RSVP for multiple events
- Users can comments on Posts
- Users can add event details to their calendar for notification
- Users can access direction to the venue from the app

We used [React Native Elements](https://github.com/react-native-training/react-native-elements) library to build UI, [React Navigation](https://reactnavigation.org/) library to handle navigation, and various packages. and [React-Native-Maps](https://github.com/react-native-community/react-native-maps) to integrate Map View and redirect users to native maps for directions to the event.


## Getting Started
> On Expo
* Download Expo Client app from the IOS or Android store
[Android App](https://play.google.com/store/apps/details?id=host.exp.exponent "Link to App"),
[IOS App](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8 "Link to App")

> Locally
```
git clone https://github.com/mitulsavani/EventUp.git

cd Front-end

yarn install

yarn run start (ios)

yarn run android (android)
```

## Build

- Through the console: `expo start iOS`<br/>
If you have an iOS simulator installed on XCode, it will automatically launch.<br/>
Otherwise you can scan the generated QR code on an iOS device.
- Scan the QR code for the built project on Expo with an iOS device:
[Expo Build](https://exp.host/@mitulsavani/Front-end "Link to Expo build")

## Screens

- **Login**
<br/>Login with an e-mail and password, or through Google and Facebook. The user is then redirected to the Events Screen.

- **Registration**
<br/>Create an account with a name, e-mail, and password. The user is then automatically logged in and redirected to the Events Screen.

- **Events**
<br/>Displays a feed of all of the soonest events. Users can choose to filter the feed with options such as category, date, time, and location. Tapping an event will redirect the user to the Event Details screen.

- **Event Details**
<br/>Provides all of the information about an event. This includes an image, description, category, date, time, and the location on a map. On this screen, the user can also: RSVP for the event, add the event to their calendar, or open the location of the event in apple maps, or message the poster.

- **Create Event**
<br/>Users can provide all of the details for an event and post it. The category and location is selected form a drop-down menu.

- **RSVP**
<br/>Displays all of the events that the user RSVP'd for. Tapping an event will redirect the user to the Event Details screen. Any messages from other users will be displayed in addition to the regular details.

- **Profile**
<br/>Contains a Sign Out button that will redirect the user to the Login screen.

![alt text](https://i.imgur.com/yGpDYka.png "Screen Flow")

## API Routes

- **POST /users/login**
<br/>Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e-mail and password<br/>
Response:&nbsp;&nbsp; user id, login status, response message, and access token

- **PUT /users/register**
<br/>Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; First name, last name, e-mail, and password<br/>
Response:&nbsp;&nbsp; user id, login status, response message, and access token

- **GET /users/getUsers**
<br/>Response:&nbsp;&nbsp; login status, response message, number of users, and an array of user objects

- **POST /users/RSVP**
<br/>Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User ID, event ID<br/>
Response:&nbsp;&nbsp; login status and response message

- **DELETE /users/RSVP**
<br/>Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User ID, event ID<br/>
Response:&nbsp;&nbsp; login status and response message

- **GET /users/RSVP/:UserID**
<br/>Response:&nbsp;&nbsp; login status, response message, and a list of events the user RSVP'd for

- **POST /users/posts**
<br/>Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User ID<br/>
Response:&nbsp;&nbsp; login status, response message, and a an array of event objects that the user posted

- **GET /events**
<br/>Response:&nbsp;&nbsp; An array of event objects

- **POST /events**
<br/>Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Event name, description, age restriction, user ID, Category ID, location ID, image, date, start time, and end time<br/>
Response:&nbsp;&nbsp; login status, response message, and event ID of the created event

- **DELETE /events/:EventID**
<br/>Response:&nbsp;&nbsp; login status and response message

- **GET /events/:EventID**
<br/>Response:&nbsp;&nbsp; login status, response message, and the event object tied to the ID


## Feedback
For any other questions about this repo in general please reach out to anyone [**@mitulsavani**](https://github.com/mitulsavani), [**@mecharmor**](https://github.com/mecharmor), [**@chinn17**](https://github.com/chinn17), [**@yungvinsantos**](https://github.com/yungvinsantos), [**@AlexWolski**](https://github.com/AlexWolski) on Github. <br>
PS: Feel free to fork it if you find our app interesting.



> Updated on: 08/28/19, Mitul Savani
