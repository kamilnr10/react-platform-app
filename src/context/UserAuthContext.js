import React, { createContext, useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

const url = 'https://thebetter.bsgroup.eu/Authorization/SignIn';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  // for (var pair of response.headers.entries()) {
  //   console.log(pair[0] + ': ' + pair[1]);
  // }
  return response.json();
}

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const signIn = (email, password) => {
    const login = {
      Username: email,
      Password: password,
    };
    if (login.Username === 'test@bsgroup.eu' && login.Password === 'Test12!@') {
      postData(url, login).then((data) => {
        localStorage.setItem('token', data.AuthorizationToken.Token);
        localStorage.setItem(
          'refreshToken',
          data.AuthorizationToken.RefreshToken
        );
        setIsAuth(true);
        setUser(data.User.FullName);
        setErrors('');
        navigate('/dashboard');
      });
    } else {
      setErrors('Incorrect login or password');
    }
  };

  const signOut = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <userAuthContext.Provider value={{ isAuth, signIn, errors, signOut, user }}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
