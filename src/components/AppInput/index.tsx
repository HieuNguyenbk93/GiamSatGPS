import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ColorGoogle, FONT_SIZE} from '../../utils/constant';

function AppInput({style, ...props}): JSX.Element {
  return (
    <TextInput
      allowFontScaling={false}
      {...props}
      style={[styles.textInput, style]}
      placeholderTextColor={ColorGoogle.Grey}
    />
  );
}

export default AppInput;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: ColorGoogle.Black,
    borderRadius: 15,
    width: '100%',
    fontSize: FONT_SIZE,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    color: ColorGoogle.Black,
  },
});
