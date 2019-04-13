import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';

import EventsStack from './EventsStack';
import MyEventsScreen from '../screens/MyEventsScreen'
import ProfileScreen from '../screens/ProfileScreen';


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
  <SimpleLineIcons
    name="handbag"
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

export default createBottomTabNavigator({
  allEvents: {
    screen: EventsStack,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: EventsTabIcon,
    },
  },
  tickets: {
    screen: MyEventsScreen,
    navigationOptions: {
      tabBarLabel: 'Tickets',
      tabBarIcon: TicketsTabIcon,
    },
  },
  myEvents: {
    screen: ProfileScreen,
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
    activeTintColor: '#E8787B',
    inactiveTintColor: '#999',
    style: {
      backgroundColor: '#FFF',
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
