import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestLoading, requestSuccess} from '../actions/requestAction';
import {loginSuccess} from '../actions/authenAction';

export const loginThunk = authen => {
  return dispatch => {
    dispatch(requestLoading());
    setTimeout(() => {
      dispatch(loginSuccess(authen));
      dispatch(requestSuccess());
      console.log('thunk: ', authen);
    }, 3000);
  };
};
