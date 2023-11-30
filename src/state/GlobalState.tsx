import React, {ReactNode} from 'react';
import {UserProvider} from './UserState';

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  return <UserProvider>{children}</UserProvider>;
};
