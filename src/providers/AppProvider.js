import React from 'react';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthContextProvider } from 'context/UserAuthContext';
import styled, { ThemeProvider } from 'styled-components';

const AppProvider = ({ children }) => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserAuthContextProvider>
          <GlobalStyle />
          {children}
        </UserAuthContextProvider>
      </ThemeProvider>
    </Router>
  );
};

export default AppProvider;
