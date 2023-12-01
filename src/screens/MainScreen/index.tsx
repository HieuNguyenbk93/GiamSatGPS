import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from '../../navigation/homeNavigation';
import AuthNavigation from '../../navigation/authNavigation';
import {GlobalStateProvider} from '../../state/GlobalState';
import {Loader} from '../../components';
import {GetLocalStore} from '../../bussiness/authen';

const MainScreen = () => {
  useEffect(() => {
    console.log('MAIN INIT');
    const requestTokenLocal = async () => {
      try {
        const requestLocal = await GetLocalStore();
        console.log(requestLocal);
      } catch (error) {
        console.log(error);
      }
    };
    requestTokenLocal();
  }, []);
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
