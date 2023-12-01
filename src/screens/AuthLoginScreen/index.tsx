import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../../utils/globalStyle';
import {AppBackgroundView, AppText} from '../../components';
import {ColorGoogle} from '../../utils/constant';
import AppInput from '../../components/AppInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/AppButton';
import {useUserState} from '../../state/UserState';
import {useRequestState} from '../../state/RequestState';
import {login} from '../../bussiness/authen';

const AuthLoginScreen = () => {
  const userState = useUserState();
  const requestState = useRequestState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onPressLogin = async () => {
    try {
      requestState.dispatch({type: 'PENDING'});
      const data = {
        username: username,
        password: password,
      };
      const result = await login(data);
      console.log(result);
      userState.dispatch({type: 'LOGIN', payload: result});
      requestState.dispatch({type: 'SUCCESS'});
    } catch (error) {
      console.log(error);
      requestState.dispatch({type: 'ERROR', payload: error});
    }
  };
  const showState = () => {
    console.log('STATE: ', userState.state);
  };
  useEffect(() => {
    console.log('INIT SCREEN');
  }, []);
  return (
    <AppBackgroundView>
      <View style={[globalStyles.flex1, styles.header]}>
        <AppText style={styles.textHeader}>GPS App</AppText>
      </View>
      <View
        style={[globalStyles.flex3, globalStyles.bgWhite, styles.container]}>
        <KeyboardAwareScrollView>
          <View style={styles.containerScroll}>
            <AppText required={true}>Tên đăng nhập</AppText>
            <AppInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <AppText>Mật khẩu</AppText>
            <AppInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.box}>
              <AppButton onPress={onPressLogin} title={'Đăng nhập'} />
            </View>
            <View style={styles.box}>
              <AppButton onPress={showState} title={'STATE'} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </AppBackgroundView>
  );
};

export default AuthLoginScreen;

const styles = StyleSheet.create({
  container: {
    borderTopStartRadius: 35,
    borderTopEndRadius: 34,
    padding: 10,
    paddingHorizontal: 20,
  },
  containerScroll: {
    justifyContent: 'space-around',
  },
  header: {
    padding: 10,
    justifyContent: 'flex-end',
  },
  textHeader: {
    fontSize: 30,
    color: 'white',
    fontWeight: 800,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: ColorGoogle.Blue,
  },
  box: {
    marginVertical: 10,
  },
});
