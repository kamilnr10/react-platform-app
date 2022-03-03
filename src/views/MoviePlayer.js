import React, { useState, useEffect } from 'react';
import { Button } from 'components/atoms/Button/Button';
import ReactPlayer from 'react-player';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from 'helpers/fetchData';

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

  return (
    <div>
      <Button onClick={() => navigate(-1)}>go back</Button>
      <ReactPlayer url={movieData.ContentUrl} playing={true} controls={true} />
    </div>
  );
};
