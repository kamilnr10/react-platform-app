import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useUserAuth } from 'context/UserAuthContext';
import { Button } from 'components/atoms/Button/Button';
import { NavWrapper, NavBar } from './Navigation.styles';

const Navigation = () => {
  const { signOut, user } = useUserAuth();
  return (
    <NavWrapper>
      <NavBar>
        <NavLink to="/">
          <Button onClick={signOut}>Logout</Button>
        </NavLink>
        <p>Welcome {user}</p>
      </NavBar>
    </NavWrapper>
  );
};

export default Navigation;
