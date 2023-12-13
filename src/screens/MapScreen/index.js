/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  AppState,
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
import BackgroundJob from 'react-native-background-actions';
import {updateLocationRequest} from '../../api/bussiness';

const AppStatusIndicator = () => {
  const appStateCurrent = useRef(AppState.currentState);

  const handleAppStateChange = nextAppState => {
    if (appStateCurrent.current === 'active' && nextAppState === 'inactive') {
      console.log(appStateCurrent, nextAppState);
    } else if (
      appStateCurrent.current.match(/inactive|background|active/) &&
      nextAppState === 'background'
    ) {
      console.log(appStateCurrent, nextAppState);
    } else if (
      appStateCurrent.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log(appStateCurrent, nextAppState);
    }
    appStateCurrent.current = nextAppState;
  };

  useEffect(() => {
    // Add event listener for app state changes
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    // Clean up the event listener on unmount
    return () => {
      const stopBg = async () => {
        await BackgroundJob.stop();
      };
      stopBg();
      subscription.remove();
    };
  }, []);

  return <></>;
};

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

  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const taskRandom = async taskData => {
    if (Platform.OS === 'ios') {
      console.warn(
        'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
        'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
      );
    }
    await new Promise(async resolve => {
      // For loop with a delay
      const {delay} = taskData;
      console.log(BackgroundJob.isRunning(), delay);
      for (let i = 0; BackgroundJob.isRunning(); i++) {
        console.log('Runned -> ', i);
        await BackgroundJob.updateNotification({taskDesc: 'Runned -> ' + i});
        await sleep(delay);
      }
    });
  };

  const taskUpdateLocation = async () => {
    // try {
    Geolocation.getCurrentPosition(
      position => {
        console.log('get current postion', position);
        // const _currentLongitude = position.coords.longitude;
        // const _currentLatitude = position.coords.latitude;
        const data = {
          Longitude: position.coords.longitude,
          Latitude: position.coords.longitude,
        };
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IjA4ODg2NjI5OTIiLCJGdWxsTmFtZSI6IlRo4bqvbmcgTlQiLCJUeXBlIjoiMSIsIlVuaXRJZCI6IjcwNzMiLCJFbWFpbCI6IjA4ODg2NjI5OTJAZ21haWwuY29tIiwiSWQiOiIyMjA0OTQiLCJleHAiOjE3MDI0MTQzMjksImlzcyI6IlRlc3QuY29tIiwiYXVkIjoiVGVzdC5jb20ifQ.JAirTgS0b_Pb4GnX5nhJ3-BKT0GxLRE0_Xwn2tqxZfw';
        // const callApi = async () => {
        //   const resultApiUpdateLocation = await updateLocationRequest(
        //     data,
        //     token,
        //   );
        //   console.log('result: ', resultApiUpdateLocation.data);
        // };
        // callApi();
        console.log(data);
        updateLocationRequest(data, token)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      },
      error => {
        // 20.979875, 105.782724
        console.log('error get current', error);
        // alertCustom('Không lấy được vị trí', ' khởi động lại app hoặc cấp quyền vị trí cho app');
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'exampleScheme://chat/jane',
    parameters: {
      delay: 1000,
    },
  };

  useEffect(() => {
    console.log('map');
    requestAuthorization();
  }, []);
  useEffect(() => {
    if (locationStatus) {
      console.log('GET CURRENT LOCATION');
      getLoaction();
      const bgJob = async () => {
        try {
          console.log('Trying to start background service');
          // if (!BackgroundJob.isRunning()) {
          //   await BackgroundJob.start(taskUpdateLocation, options);
          // }
          // if (BackgroundJob.isRunning()) {
          //   await BackgroundJob.stop();
          // }
          console.log('Successful start!');
          await taskUpdateLocation();
        } catch (e) {
          console.log('Error', e);
        }
      };
      bgJob();
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
            ref={mapRef}
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
      <AppStatusIndicator />
    </AppBackgroundView>
  );
};

export default MapScreen;

// const styles = StyleSheet.create({});
