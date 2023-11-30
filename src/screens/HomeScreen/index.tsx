import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScreenName} from '../../utils/constant';
import {AppBackgroundView, AppText} from '../../components';
import globalStyles from '../../utils/globalStyle';
import Entypo from 'react-native-vector-icons/Entypo';

// const menu = [{title: 'Map', icon: 'location', screen: }];

const HomeScreen = ({navigation}) => {
  const onPressButton = () => {
    navigation.navigate(ScreenName.map);
  };
  return (
    <AppBackgroundView>
      <View style={[globalStyles.container, styles.bgWhite]}>
        <TouchableOpacity onPress={onPressButton}>
          <Entypo name="location" size={30} color="blue" />
          <AppText>Map</AppText>
        </TouchableOpacity>
      </View>
    </AppBackgroundView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bgWhite: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
