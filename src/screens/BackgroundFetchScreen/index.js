import {
  AppState,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BackgroundJob from 'react-native-background-actions';

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
      subscription.remove();
    };
  }, []);

  return <></>;
};

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

BackgroundJob.on('expiration', () => {
  console.log('iOS: I am being closed!');
});

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

function handleOpenURL(evt) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

const BgJob = () => {
  const toggleBackground = async () => {
    let playing = BackgroundJob.isRunning();
    playing = !playing;
    if (playing) {
      try {
        console.log('Trying to start background service');
        await BackgroundJob.start(taskRandom, options);
        console.log('Successful start!');
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      console.log('Stop background service');
      await BackgroundJob.stop();
    }
  };
  return (
    <TouchableOpacity
      style={{height: 100, width: 100, backgroundColor: 'red'}}
      onPress={toggleBackground}></TouchableOpacity>
  );
};

const BackgroundFetchScreen = () => {
  return (
    <View>
      <Text>BackgroundFetchScreen</Text>
      <AppStatusIndicator />
      <BgJob />
    </View>
  );
};

export default BackgroundFetchScreen;

// const styles = StyleSheet.create({});
