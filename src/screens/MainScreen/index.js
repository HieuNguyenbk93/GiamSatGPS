import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from '../../navigation/homeNavigation';
import AuthNavigation from '../../navigation/authNavigation';
import {Loader} from '../../components';
import {useSelector} from 'react-redux';
import {isFetchingSelector} from '../../redux/selectors/requestSeletor';

const MainScreen = () => {
  // const dispatch = useDispatch();
  const isLoading = useSelector(isFetchingSelector);
  useEffect(() => {
    console.log('MAIN INIT');
  }, []);
  const render = () => {
    if (true) {
      return <HomeNavigation />;
    } else {
      return <AuthNavigation />;
    }
  };
  return (
    <NavigationContainer>
      {render()}
      <Loader isLoading={isLoading} />
    </NavigationContainer>
  );
};

export default MainScreen;
