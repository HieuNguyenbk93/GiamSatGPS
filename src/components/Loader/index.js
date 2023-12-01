// Loading.js
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {ColorGoogle} from '../../utils/constant';

const Loader = isLoading => {
  if (!isLoading) {
    return null; // Don't render the component if isLoading is false
  }

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={ColorGoogle.Grey} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
