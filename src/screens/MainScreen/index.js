/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from '../../navigation/homeNavigation';
import AuthNavigation from '../../navigation/authNavigation';
import {Loader} from '../../components';
import {useSelector} from 'react-redux';
import {isFetchingSelector} from '../../redux/selectors/requestSeletor';
import {authenSelector} from '../../redux/selectors/authenSelector';

const MainScreen = () => {
  // const dispatch = useDispatch();
  const isLoading = useSelector(isFetchingSelector);
  const authen = useSelector(authenSelector);
  // const [checkLogin, setCheckLogin] = useState(false);
  useEffect(() => {
    console.log('main: ', authen);
    // if (authen.accessToken !== undefined && authen.accessToken !== '') {
    //   setCheckLogin(true);
    // } else {
    //   setCheckLogin(false);
    // }
  }, []);
  const render = () => {
    if (authen.accessToken !== undefined && authen.accessToken !== '') {
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
