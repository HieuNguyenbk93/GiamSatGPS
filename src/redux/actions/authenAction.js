export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = userInfor => ({
  type: LOGIN,
  payload: userInfor,
});

export const logout = data => ({
  type: LOGOUT,
  payload: data,
});
