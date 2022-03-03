import { useUserAuth } from 'context/UserAuthContext';
import { AuthenticatedApp } from 'views/AuthenticatedApp';
import { UnauthenticatedApp } from 'views/UnauthenticatedApp';

function App() {
  const { isAuth } = useUserAuth();

  return isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
