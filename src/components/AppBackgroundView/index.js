import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import globalStyles from '../../utils/globalStyle';
import {ColorGoogle} from '../../utils/constant';

const AppBackgroundView = ({children, opacity}) => {
  return (
    <View style={[globalStyles.container, styles.bgWhtie]}>
      <SafeAreaView style={[globalStyles.container, {opacity: opacity}]}>
        <StatusBar barStyle="light-content" />
        {children}
      </SafeAreaView>
    </View>
  );
};

export default AppBackgroundView;

const styles = StyleSheet.create({
  bgWhtie: {
    backgroundColor: ColorGoogle.MediumBlue,
  },
});
