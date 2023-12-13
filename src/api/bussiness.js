import axios from 'axios';
import {host} from './host';

const LOGIN_API = '/Contact/LoginForWeb';
const UPDATE_LOCATION = '/User/UpdateViTri';

export const loginRequest = params => {
  const url = host + LOGIN_API;
  const data = JSON.stringify(params);
  return axios({
    method: 'post',
    url: url,
    headers: {'Content-Type': 'application/json'},
    data: data,
  });
};

export const updateLocationRequest = async (params, token) => {
  const url = host + UPDATE_LOCATION;
  const data = JSON.stringify(params);
  const bear = 'Bearer ' + token;
  console.log(url);
  return await axios({
    method: 'post',
    url: url,
    headers: {'Content-Type': 'application/json', Authorization: bear},
    data: data,
  });
};
