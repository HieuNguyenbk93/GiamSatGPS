import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorGoogle, FONT_SIZE} from '../../utils/constant';
import globalStyles from '../../utils/globalStyle';

function AppText({children, required, style, ...props}): JSX.Element {
  return (
    <View style={globalStyles.row}>
      <Text {...props} style={[styles.text, style]} allowFontScaling={false}>
        {children}
      </Text>
      {required ? <Text style={[styles.text, styles.danger]}>*</Text> : <></>}
    </View>
  );
}

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE,
    color: ColorGoogle.Black,
    fontWeight: '400',
  },
  danger: {
    color: ColorGoogle.Red,
  },
});
