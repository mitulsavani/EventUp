import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';

import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EventsScreen from '../screens/EventsScreen';
import CreateEventScreen from '../screens/CreateEvent';
import DetailEventScreen from '../screens/DetailEventScreen';
import AuthLoadingScreen  from '../screens/AuthLoadingScreen';
import RsvpScreen from '../screens/RsvpScreen';

const AuthStack =  createStackNavigator({
  login: {
    screen: LoginScreen,
  },
  signup: {
    screen: SignupScreen,
  },
}, {
  initialRouteName: 'login',
  mode: 'mode'
});

const EventStack =  createStackNavigator({
  events: {
    screen: EventsScreen,
  },
  detailEvent: {
    screen: DetailEventScreen,
  },
  createEvent: {
    screen: CreateEventScreen,
  }
});

EventStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const TicketStack = createStackNavigator({
  myEvents: {
    screen: RsvpScreen
  }
});

const ProfileStack = createStackNavigator({
  profile: {
    screen: ProfileScreen
  }
})

const EventsTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="calendar"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 22}
  />
);
EventsTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const TicketsTabIcon = ({ tintColor }) => (
  <Entypo
    name="ticket"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 22}
  />
);
TicketsTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const AccountTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="user"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 22}
  />
);
AccountTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const TabNavigator = createBottomTabNavigator({
  allEvents: {
    screen: EventStack,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: EventsTabIcon,
    },
  },
  tickets: {
    screen: TicketStack,
    navigationOptions: {
      tabBarLabel: 'RSVP',
      tabBarIcon: TicketsTabIcon,
    },
  },
  profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: AccountTabIcon,
    },
  },
}, {
  initialRouteName: 'allEvents',
  tabBarPosition: 'bottom',
  animationEnabled: Platform.OS !== 'ios',
  swipeEnabled: Platform.OS !== 'ios',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#FFCA13',
    inactiveTintColor: '#999',
    style: {
      backgroundColor: '#330033',
      padding: Platform.OS === 'ios' ? 5 : 0,
    },
    indicatorStyle: {
      backgroundColor: '#FFF',
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});

export const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    EventsLoading: EventsScreen,
    App: TabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));
