/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenName} from '../utils/constant';
import {HomeScreen} from '../screens';

const HomeStackNavigation = createNativeStackNavigator();

const HomeStack = () => (
  <HomeStackNavigation.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStackNavigation.Screen name={ScreenName.home} component={HomeScreen} />
  </HomeStackNavigation.Navigator>
);

const HomeNavigation = () => {
  return <HomeStack />;
};

export default HomeNavigation;
