import {Dimensions} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const toastMessage = (type, text1, text2, position) => {
  const {height} = Dimensions.get('window');
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    position: position,
    visibilityTime: 1500,
    onPress: () => {
      Toast.hide();
    },
    bottomOffset: (height * 1) / 12,
  });
};
