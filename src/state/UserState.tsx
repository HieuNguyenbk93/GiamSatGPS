import React, {createContext, useReducer, useContext} from 'react';

// Define your initial state and reducer function
const initialState = {
  accessToken: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, accessToken: action.payload};
    case 'LOGOUT':
      return {...state, accessToken: ''};
    default:
      return state;
  }
};

const UserStateContext = createContext();

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={{state, dispatch}}>
      {children}
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};
