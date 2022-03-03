import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Dashboard from 'views/Dashboard';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate,
} from 'react-router-dom';
import Login from 'components/organisms/Login/Login';
import ProtectedRoute from 'helpers/ProtectedRoute';
import { Button } from 'components/atoms/Button/Button';
import { useUserAuth } from 'context/UserAuthContext';
import { MainTemplate } from 'components/templates/MainTemplate/MainTemplate';
import { Wrapper } from 'components/atoms/Wrapper/Wrapper';
import { fetchData } from 'helpers/fetchData';

// async function postNewData(url = '', token = null, data = {}) {
//   const response = await fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     // headers: {},
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

export const MoviePlayer = () => {
  const [movieData, setMovieData] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();
  id = parseInt(id);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchData('https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo', token, {
      MediaId: id,
      StreamType: 'TRIAL',
    })
      .then((data) => {
        setMovieData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(movieData.ContentUrl);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>go back</Button>
      <ReactPlayer url={movieData.ContentUrl} playing={true} controls={true} />
    </div>
  );
};

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
