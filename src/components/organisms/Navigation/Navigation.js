import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useUserAuth } from 'context/UserAuthContext';
import { Button } from 'components/atoms/Button/Button';

const NavWrapper = styled.div`
  width: 100vw;
  height: 100px;
`;

const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Navigation = () => {
  const { signOut, user } = useUserAuth();
  return (
    <NavWrapper>
      <NavBar>
        <NavLink to="/">
          <Button onClick={signOut}>Logout</Button>
        </NavLink>
        <h4>You are logged in as: {user}</h4>
      </NavBar>
    </NavWrapper>
  );
};

export default Navigation;
