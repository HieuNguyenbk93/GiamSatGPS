import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScreenName} from '../../utils/constant';
import {AppBackgroundView, AppText} from '../../components';
import globalStyles from '../../utils/globalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {HEIGHT, WIDTH} from '../../themes';

// const menu = [{title: 'Map', icon: 'location', screen: }];

const HomeScreen = ({navigation}) => {
  const onPressButton = () => {
    // navigation.navigate(ScreenName.map);
    console.log('map');
  };
  return (
    <AppBackgroundView>
      <View style={[globalStyles.container, styles.bgWhite]}>
        {/* <TouchableOpacity onPress={onPressButton}>
          <Entypo name="location" size={30} color="blue" />
          <AppText>Map</AppText>
        </TouchableOpacity> */}
        <MapView
          initialRegion={{
            latitude: 21.19127,
            longitude: 106.077184,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={[globalStyles.flex1, styles.map]}
          provider={PROVIDER_GOOGLE}
        />
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
  map: {
    width: WIDTH,
    height: '100%',
    position: 'absolute',
  },
});
