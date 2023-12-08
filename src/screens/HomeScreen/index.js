/* eslint-disable react-hooks/exhaustive-deps */
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppBackgroundView, AppText} from '../../components';
import globalStyles from '../../utils/globalStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {HEIGHT, WIDTH} from '../../themes';
import Geolocation from '@react-native-community/geolocation';

// const menu = [{title: 'Map', icon: 'location', screen: }];

const HomeScreen = ({navigation}) => {
  const mapRef = useRef(null);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState(false);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cấp quyền truy cập vị trí',
          message: 'App cần truy cập vị trí để hoạt động',
          buttonNeutral: 'Hỏi tôi sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const getLocation = () => {
    if (Platform.OS === 'android') {
      const result = requestLocationPermission();
      result
        .then(res => {
          if (res) {
            Geolocation.getCurrentPosition(
              position => {
                console.log(position);
                //getting the Longitude from the location json
                const _currentLongitude = position.coords.longitude;
                //getting the Latitude from the location json
                const _currentLatitude = position.coords.latitude;
                console.log(_currentLongitude, _currentLatitude);
                //Setting Longitude state
                setCurrentLongitude(_currentLongitude);
                //Setting Longitude state
                setCurrentLatitude(_currentLatitude);
                handleAnimate(_currentLatitude, _currentLongitude);
                setLocationStatus(true);
              },
              error => {
                // 20.979875, 105.782724
                console.log('error get current', error);
                setLocationStatus(false);
                // alertCustom('Không lấy được vị trí', ' khởi động lại app hoặc cấp quyền vị trí cho app');
              },
              {enableHighAccuracy: false, timeout: 15000},
            );
          }
        })
        .catch(err => {
          console.log('error catch', err);
          setLocationStatus(false);
        });
    }
  };
  useEffect(() => {
    if (Platform.OS === 'ios') {
      // requestLocationPermissionIos();
    } else {
      getLocation();
    }
  }, []);
  const handleAnimate = (lat, long) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        2000, // Animation duration in milliseconds
      );
    }
  };
  return (
    <AppBackgroundView>
      <View style={[globalStyles.container, styles.bgWhite]}>
        <MapView
          initialRegion={{
            latitude: 21.19127,
            longitude: 106.077184,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={[globalStyles.flex1, styles.map]}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}>
          {locationStatus ? (
            <Marker
              coordinate={{
                longitude: currentLongitude,
                latitude: currentLatitude,
              }}>
              <FontAwesome name="dot-circle-o" size={30} color={'red'} />
            </Marker>
          ) : (
            <></>
          )}
        </MapView>
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
