import React from 'react';
import Dashboard from 'views/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Login from 'components/organisms/Login/Login';
import ProtectedRoute from 'helpers/ProtectedRoute';
import { MainTemplate } from 'components/templates/MainTemplate/MainTemplate';
import { Wrapper } from 'components/atoms/Wrapper/Wrapper';
import { MoviePlayer } from 'views/MoviePlayer';

export const AuthenticatedApp = () => {
  return (
    <MainTemplate>
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/dashboard/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard">
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <MoviePlayer />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Wrapper>
    </MainTemplate>
  );
};
