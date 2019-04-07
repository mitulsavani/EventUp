    
import { createStackNavigator } from 'react-navigation';

import EventsScreen from '../screens/EventsScreen';
import DetailEventScreen from '../screens/DetailEventScreen';

export default createStackNavigator({
  events: {
    screen: EventsScreen,
  },
  detailEvent: {
    screen: DetailEventScreen,
  },
});