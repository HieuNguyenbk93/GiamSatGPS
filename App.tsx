import * as React from 'react';
import MainScreen from './src/screens/MainScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/root-store';
import Toast, {BaseToast} from 'react-native-toast-message';
import {StyleSheet} from 'react-native';

const toastConfig = {
  success: ({text1, text2, ...rest}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: '#0FAE15', height: 70, width: '80%'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={styles.textToastStyleBig}
      text2Style={styles.textToastStyleSmall}
      text1={text1}
      text2={text2}
    />
  ),
  error: ({text1, text2, ...rest}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: '#D32F2F', height: 70, width: '80%'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={styles.textToastStyleBig}
      text2Style={styles.textToastStyleSmall}
      text1={text1}
      text2={text2}
    />
  ),
};

function App() {
  return (
    <>
      <Provider store={store}>
        <MainScreen />
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  textToastStyleSmall: {
    fontSize: 14,
    color: '#455A64',
  },
  textToastStyleBig: {
    fontSize: 16,
    color: '#455A64',
  },
});
