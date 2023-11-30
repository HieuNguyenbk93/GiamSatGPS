import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AuthSignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AuthSignUpScreen</Text>
    </View>
  );
};

export default AuthSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
