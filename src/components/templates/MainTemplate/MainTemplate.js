import React from 'react';
import { Wrapper } from 'components/atoms/Wrapper/Wrapper';
import Navigation from 'components/organisms/Navigation/Navigation';

export const MainTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Navigation />
      {children}
    </Wrapper>
  );
};
