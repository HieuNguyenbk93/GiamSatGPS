import React, {ReactNode} from 'react';
import {UserProvider} from './UserState';
import {RequestProvider} from './RequestState';

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  return (
    <RequestProvider>
      <UserProvider>{children}</UserProvider>
    </RequestProvider>
  );
  // return <UserProvider>{children}</UserProvider>;
};
