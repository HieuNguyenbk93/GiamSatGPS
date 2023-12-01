export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const requestLoading = () => ({type: LOADING});

export const requestSuccess = () => ({type: SUCCESS});

export const requestFail = error => ({
  type: ERROR,
  payload: error,
});
