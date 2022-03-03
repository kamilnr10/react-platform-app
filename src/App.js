import Dashboard from 'views/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Login from 'components/organisms/Login/Login';
import ProtectedRoute from 'helpers/ProtectedRoute';
import { useUserAuth } from 'context/UserAuthContext';
import { MainTemplate } from 'components/templates/MainTemplate/MainTemplate';
import { Wrapper } from 'components/atoms/Wrapper/Wrapper';
import { MoviePlayer } from 'views/MoviePlayer';

const AuthenticatedApp = () => {
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

const UnauthenticatedApp = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
};

function App() {
  const { isAuth } = useUserAuth();

  return isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
