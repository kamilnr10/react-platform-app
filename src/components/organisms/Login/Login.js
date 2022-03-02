import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUserAuth } from 'context/UserAuthContext';
import {
  LoginForm,
  LoginContainer,
  CircleBackground,
  LoginTextBox,
  Button,
  ErrorMessage,
} from './Login.styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, errors } = useUserAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <LoginForm as="form" onSubmit={handleSubmit}>
      <LoginContainer>
        {errors && <p>{errors}</p>}
        <LoginTextBox
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <LoginTextBox
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button>Login</Button>
        <CircleBackground />
      </LoginContainer>
    </LoginForm>
  );
};

export default Login;