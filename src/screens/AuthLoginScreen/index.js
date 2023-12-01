import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../../utils/globalStyle';
import {AppBackgroundView, AppText} from '../../components';
import {ColorGoogle} from '../../utils/constant';
import AppInput from '../../components/AppInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {isErrorSelector} from '../../redux/selectors/requestSeletor';
import {authenSelector} from '../../redux/selectors/authenSelector';
import {loginThunk} from '../../redux/thunk/authenThunkAction';

const AuthLoginScreen = () => {
  const dispatch = useDispatch();
  const isError = useSelector(isErrorSelector);
  const authen = useSelector(authenSelector);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = async () => {
    try {
      const data = {
        username: username,
        password: password,
      };
      dispatch(loginThunk(data));
    } catch (error) {
      console.log(error);
    }
  };
  const showState = () => {
    console.log('STATE: ');
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