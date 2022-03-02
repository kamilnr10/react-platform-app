import React, { useState, useEffect } from 'react';
import { useUserAuth } from 'context/UserAuthContext';
import { fetchData } from 'helpers/fetchData';
import { Movie } from 'components/organisms/Movie/Movie';

const Dashboard = () => {
  const [moviesList, setMoviesList] = useState([]);
  const { isAuth, user } = useUserAuth();

  const data = {
    MediaListId: 3,
    IncludeCategories: false,
    IncludeImages: true,
    IncludeMedia: false,
    PageNumber: 1,
    PageSize: 15,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchData('https://thebetter.bsgroup.eu/Media/GetMediaList', token, data)
      .then((data) => {
        console.log(data);
        console.log(isAuth);
        setMoviesList(data.Entities);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {moviesList.map((item) => (
        <Movie key={item.Id} {...item} />
      ))}
    </div>
  );
};

export default Dashboard;
