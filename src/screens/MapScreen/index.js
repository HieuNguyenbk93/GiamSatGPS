/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  PermissionsAndroid,
  Platform,
  // StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {AppBackgroundView} from '../../components';
import globalStyles from '../../utils/globalStyle';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MapScreen = () => {
  const mapRef = useRef(null);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const requestLocationPermissionAndroid = async () => {
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
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const requestAuthorization = () => {
    Geolocation.requestAuthorization(
      () => {
        setLocationStatus(true);
      },
      async error => {
        console.log('error', error);
        const _permission =
          Platform.OS === 'android'
            ? await requestLocationPermissionAndroid()
            : false;
        if (_permission) {
          setLocationStatus(true);
        } else {
          setLocationStatus(false);
        }
      },
    );
  };

  const getLoaction = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('get current postion', position);
        //getting the Longitude from the location json
        const _currentLongitude = position.coords.longitude;
        //getting the Latitude from the location json
        const _currentLatitude = position.coords.latitude;
        console.log('state long lat: ', _currentLongitude, _currentLatitude);
        //Setting Longitude state
        setCurrentLongitude(_currentLongitude);
        //Setting Longitude state
        setCurrentLatitude(_currentLatitude);
        // handleAnimate(_currentLatitude, _currentLongitude);
      },
      error => {
        // 20.979875, 105.782724
        console.log('error get current', error);
        setLocationStatus(false);
        // alertCustom('Không lấy được vị trí', ' khởi động lại app hoặc cấp quyền vị trí cho app');
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  const watchPosition = () => {
    try {
      const watchID = Geolocation.watchPosition(
        position => {
          const _currentLongitude = position.coords.longitude;
          const _currentLatitude = position.coords.latitude;
          console.log('watchPosition: ', _currentLongitude, _currentLatitude);
          setCurrentLongitude(_currentLongitude);
          setCurrentLatitude(_currentLatitude);
          handleAnimate(_currentLatitude, _currentLongitude);
          // setPosition(JSON.stringify(position));
        },
        error => Alert.alert('WatchPosition Error', JSON.stringify(error)),
        {enableHighAccuracy: true},
      );
      setSubscriptionId(watchID);
    } catch (error) {
      Alert.alert('WatchPosition Error', JSON.stringify(error));
    }
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
    // setPosition(null);
  };

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

  useEffect(() => {
    console.log('map');
    requestAuthorization();
  }, []);
  useEffect(() => {
    if (locationStatus) {
      console.log('GET CURRENT LOCATION');
      getLoaction();
    }
  }, [locationStatus]);
  useEffect(() => {
    watchPosition();
    return () => {
      clearWatch();
    };
  }, []);
  return (
    <AppBackgroundView>
      {currentLongitude !== '...' && currentLatitude !== '...' ? (
        <View style={[globalStyles.container]}>
          <MapView
            initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={[globalStyles.flex1]}
            // ref={mapRef}
            provider={PROVIDER_GOOGLE}>
            <Marker
              coordinate={{
                longitude: currentLongitude,
                latitude: currentLatitude,
              }}>
              <FontAwesome name="dot-circle-o" size={30} color={'red'} />
            </Marker>
          </MapView>
        </View>
      ) : (
        <></>
      )}
    </AppBackgroundView>
  );
};

export default MapScreen;

// const styles = StyleSheet.create({});
