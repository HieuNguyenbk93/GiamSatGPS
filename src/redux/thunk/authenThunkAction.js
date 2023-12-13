import {
  requestFail,
  requestLoading,
  requestSuccess,
} from '../actions/requestAction';
import {loginSuccess} from '../actions/authenAction';
import {loginRequest} from '../../api/bussiness';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginThunk = authen => {
  return dispatch => {
    dispatch(requestLoading());
    const callApi = async () => {
      const result = await loginRequest(authen);
      console.log(result.data);
      if (result.data.success === 'INCORRECT') {
        const logError = result.data.message;
        dispatch(requestFail(logError));
      } else {
        const resultData = result.data;
        // await AsyncStorage.setItem(
        //   'accessToken',
        //   resultData.accessToken.toString(),
        // );
        await AsyncStorage.setItem('userName', resultData.userName.toString());
        await AsyncStorage.setItem('fullName', resultData.fullName.toString());
        await AsyncStorage.setItem('password', authen.password);
        const dataDispatch = {
          accessToken: resultData.accessToken,
          fullName: resultData.fullName,
          userName: resultData.userName,
        };
        dispatch(requestSuccess());
        dispatch(loginSuccess(dataDispatch));
      }
    };
    try {
      callApi();
    } catch (error) {
      console.log(error);
      const logError = 'Have error';
      dispatch(requestFail(logError));
    }
  };
};

// export const loginLocalThunk = () => {
//   return dispatch => {
//     dispatch(requestLoading());
//     const callApi = async () => {
//       const userName = await AsyncStorage.getItem('userName');
//       const password = await AsyncStorage.getItem('password');

//     }
//   };
// };
