# Event Up
---
Event Up is a social app on iOS for San Francisco State University students. Users can post, browse, and RSVP for events around campus.
Other features include a button to add an event to your calendar and Google Maps integration.

### TODO

- Login through Google and Facebook
- A messaging system for users to contact the creator of a post
- A map showing the Wi-Fi strength around campus

# Set Up

- Clone the repo: `git clone https://github.com/csc667-02-sp19/csc667-sp19-Team04.git`
- Install npm: `npm install download`
- Navigate to the project: `cd csc667-02-sp19/Front-end`
- Download all dependencies: `npm install`
- Install expo-cli: `npm install -g expo-cli`

# Build

- Through the console: `expo start iOS`
If you have an iOS simulator installed on XCode, it will automatically launch
Otherwise you can scan the generated QR code on an iOS device.
- From expo:
Scan the QR code from this link on an iOS device: https://expo.io/@mitulsavani/Front-end

# Screens

- **Login**
Login with an e-mail and password, or through Google and Facebook. The user is then redirected to the Events Screen.

- **Registration**
Create an account with a name, e-mail, and password. The user is then automatically logged in and redirected to the Events Screen.

- **Events**
Displays a feed of all of the soonest events. Users can choose to filter the feed with options such as category, date, time, and location. Tapping an event will redirect the user to the Event Details screen.

- **Event Details**
Provides all of the information about an event. This includes an image, description, category, date, time, and the location on a map.
On this screen, the user can also: RSVP for the event, add the event to their calendar, or open the location of the event in apple maps, or message the poster.

- **Create Event**
Users can provide all of the details for an event and post it. The category and location is selected form a drop-down menu.

- **RSVP**
Displays all of the events that the user RSVP'd for. Tapping an event will redirect the user to the Event Details screen. Any messages from other users will be displayed in addition to the regular details.

- **Profile**
Contains a Sign Out button that will redirect the user to the Login screen.

![alt text](https://i.imgur.com/yGpDYka.png "Screen Flow")

# API Routes

- **POST /users/login**
Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e-mail and password
Response:&nbsp;&nbsp; user id, login status, response message, and access token

- **PUT /users/register**
Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; First name, last name, e-mail, and password
Response:&nbsp;&nbsp; user id, login status, response message, and access token

- **GET /users/getUsers**
Response:&nbsp;&nbsp; login status, response message, number of users, and an array of user objects

- **POST /users/RSVP**
Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User ID, event ID
Response:&nbsp;&nbsp; login status and response message

- **DELETE /users/RSVP**
Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User ID, event ID
Response:&nbsp;&nbsp; login status and response message

- **GET /users/RSVP/:UserID**
Response:&nbsp;&nbsp; login status, response message, and a list of events the user RSVP'd for

- **POST /users/posts**
Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User ID
Response:&nbsp;&nbsp; login status, response message, and a an array of event objects that the user posted

- **GET /events**
Response:&nbsp;&nbsp; An array of event objects

- **POST /events**
Request:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Event name, description, age restriction, user ID, Category ID, location ID, image, date, start time, and end time
Response:&nbsp;&nbsp; login status, response message, and event ID of the created event

- **DELETE /events/:EventID**
Response:&nbsp;&nbsp; login status and response message

- **GET /events/:EventID**
Response:&nbsp;&nbsp; login status, response message, and the event object tied to the ID
