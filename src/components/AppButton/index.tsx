import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppText from '../AppText';
import {ColorGoogle} from '../../utils/constant';

function AppButton({style, title, onPress}): JSX.Element {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AppText style={styles.text}>{title.toUpperCase()}</AppText>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorGoogle.Blue,
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontWeight: 700,
  },
});
