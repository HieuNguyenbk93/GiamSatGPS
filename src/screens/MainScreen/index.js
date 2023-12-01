import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from '../../navigation/homeNavigation';
import AuthNavigation from '../../navigation/authNavigation';
import {Loader} from '../../components';

const MainScreen = () => {
  useEffect(() => {
    console.log('MAIN INIT');
  }, []);
  const render = () => {
    if (false) {
      return <HomeNavigation />;
    } else {
      return <AuthNavigation />;
    }
  };
  return (
    <NavigationContainer>
      {render()}
      {/* <Loader /> */}
    </NavigationContainer>
  );
};

export default MainScreen;
