import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async data => {
  console.log(data);
  const result = {
    username: data.username,
    password: data.password,
    accessToken: data.username,
  };
  AsyncStorage.setItem('accessToken', data.username);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.password === '123') {
        resolve(result);
      } else {
        reject({error: 'Password incorrect'});
      }
    }, 2000);
  });
};

export const GetLocalStore = () => {
  const getAccessToken = AsyncStorage.getItem('accessToken');
  return Promise.all([getAccessToken]);
};
