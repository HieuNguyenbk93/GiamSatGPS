import React, {createContext, useReducer, useContext} from 'react';

// Define your initial state and reducer function
const initialState = {
  isLoading: false,
  isError: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'PENDING':
      return {...state, isLoading: true, error: null};
    case 'SUCCESS':
      return {...state, isLoading: false, isError: false, error: null};
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const RequestStateContext = createContext();

export const RequestProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RequestStateContext.Provider value={{state, dispatch}}>
      {children}
    </RequestStateContext.Provider>
  );
};

export const useRequestState = () => {
  const context = useContext(RequestStateContext);
  if (!context) {
    throw new Error('useRequestState must be used within a RequestProvider');
  }
  return context;
};
