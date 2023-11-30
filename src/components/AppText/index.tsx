import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {ComponentProps} from '../../models/general';

function AppText({children, style, props}: ComponentProps): JSX.Element {
  return (
    <Text {...props} style={[style, styles.text]} allowFontScaling={false}>
      {children}
    </Text>
  );
}

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#4D5665',
    fontWeight: '400',
  },
});
