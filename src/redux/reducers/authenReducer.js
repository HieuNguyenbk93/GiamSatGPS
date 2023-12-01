import {LOGIN, LOGOUT} from '../actions/authenAction';

const initalState = {
  authen: {},
  // typeError: 0, // 0: ko loi, 1: sai mat khau, 2: cac loi khac
};

const authenReducer = (state = initalState, {type, payload}) => {
  switch (type) {
    case LOGIN:
      return {...state, authen: payload};
    case LOGOUT:
      return {...state, authen: payload};
    default:
      return state;
  }
};

export default authenReducer;
