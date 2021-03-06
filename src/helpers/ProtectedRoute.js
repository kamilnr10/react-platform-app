import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from 'context/UserAuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useUserAuth();

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
