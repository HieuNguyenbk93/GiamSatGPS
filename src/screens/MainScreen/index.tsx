import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from '../../navigation/homeNavigation';
import AuthNavigation from '../../navigation/authNavigation';
import {GlobalStateProvider} from '../../state/GlobalState';

const MainScreen = () => {
  const render = () => {
    if (false) {
      return <HomeNavigation />;
    } else {
      return <AuthNavigation />;
    }
  };
  return (
    <NavigationContainer>
      <GlobalStateProvider>{render()}</GlobalStateProvider>
    </NavigationContainer>
  );
};

export default MainScreen;
