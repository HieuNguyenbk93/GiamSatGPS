import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from '../../navigation/homeNavigation';
import AuthNavigation from '../../navigation/authNavigation';
import {GlobalStateProvider} from '../../state/GlobalState';
import {Loader} from '../../components';

const MainScreen = () => {
  function render(): React.JSX.Element {
    if (false) {
      return <HomeNavigation />;
    } else {
      return <AuthNavigation />;
    }
  }
  return (
    <NavigationContainer>
      <GlobalStateProvider>
        {render()}
        <Loader />
      </GlobalStateProvider>
    </NavigationContainer>
  );
};

export default MainScreen;
