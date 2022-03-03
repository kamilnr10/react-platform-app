import React from 'react';
import Login from 'components/organisms/Login/Login';
import { Wrapper } from 'components/atoms/Wrapper/Wrapper';

export const UnauthenticatedApp = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
};
