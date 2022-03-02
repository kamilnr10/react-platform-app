import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  NavLink,
  Link,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { useUserAuth } from 'context/UserAuthContext';

export const LoginForm = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0px 7px 20px 4px rgba(236, 232, 253, 1);
  overflow: hidden;
  z-index: 10;
`;

export const CircleBackground = styled.div`
  position: absolute;
  width: 700px;
  height: 700px;
  background-color: #f9f5ff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
  z-index: -1;
`;

export const LoginTextBox = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: grey;
  border: 1px solid #6c95bb;
  box-shadow: inset 0px 6px 20px 4px rgba(209, 220, 232, 1);
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  background-image: linear-gradient(to right, #756ef4 0%, #be85fa 100%);
  /* box-shadow: 0px 7px 31px 19px rgba(56, 206, 232, 1); */
`;

export const ErrorMessage = styled.div`
  width: 100%;
  background-color: #ff7676b2;
  margin: 0 0 10px 0;
`;

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // data: {
    //   Username: 'test@bsgroup.eu',
    //   Password: 'Test12!@',
    //   Device: {
    //     PlatformCode: 'WEB',
    //     Name: '7a6a86e5-356f-4795-8998-305e1b205531',
    //   },
    // },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  for (var pair of response.headers.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
  return response.json();
}

// async function postNewData(url = '', token, data = {}) {
//   const res = await fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },

//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(data),
//   });
//   for (var pair of res.headers.entries()) {
//     console.log(pair[0] + ': ' + pair[1]);
//   }
//   return res.json();
// }

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, errors } = useUserAuth();
  //   const navigate = useNavigate();
  //   const [token, setToken] = useState('');
  //   const [refreshToken, setRefreshToken] = useState('');

  const url = 'https://thebetter.bsgroup.eu/Authorization/SignIn';

  const handleSubmit = (e) => {
    // const user = {
    //   Username: email,
    //   Password: password,
    // };
    e.preventDefault();
    signIn(email, password);

    // if (user.Username === 'test@bsgroup.eu' && user.Password === 'Test12!@') {
    //   postData(url, user).then((data) => {
    //     console.log(data);
    //     localStorage.setItem('token', data.AuthorizationToken.Token);
    //     localStorage.setItem(
    //       'refreshToken',
    //       data.AuthorizationToken.RefreshToken
    //     );
    //     // setToken(data.AuthorizationToken.Token);
    //     // setToken(data.AuthorizationToken.RefreshToken);
    //     navigate('/dashboard');
    //   });
    // }
    // else {
    //   setEmail('');
    //   setPassword('');
    // }
  };

  //   const getMedia = () => {
  //     const token = localStorage.getItem('token');
  //     postNewData('https://thebetter.bsgroup.eu/Media/GetMediaList', token).then(
  //       (data) => {
  //         console.log(data);
  //       }
  //     );
  //   };

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
