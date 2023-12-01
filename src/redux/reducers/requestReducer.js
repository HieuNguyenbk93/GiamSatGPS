import {ERROR, LOADING, SUCCESS} from '../actions/requestAction';

const initalState = {
  isLoading: false,
  isError: false,
  error: '',
};

const requestReducer = (state = initalState, {type, payload}) => {
  switch (type) {
    case LOADING:
      return {...state, isLoading: true};
    case SUCCESS:
      return {isLoading: false, isError: false, error: ''};
    case ERROR:
      return {isLoading: false, isError: true, error: payload};
    default:
      return state;
  }
};

export default requestReducer;
