import React, { useState, useEffect } from 'react';
import { Button } from 'components/atoms/Button/Button';
import ReactPlayer from 'react-player';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from 'helpers/fetchData';
import styled from 'styled-components';

const ReturnButton = styled(Button)`
  background-image: none;
  background-color: transparent;
  border: 2px solid #756ef4;
  color: #756ef4;
  transition: 0.3s ease;

  &:hover {
    background-color: #756ef4;
    color: white;
  }
`;

const MoviePlayerWrapper = styled.div``;

export const MoviePlayer = () => {
  const [movieData, setMovieData] = useState({});
  const [error, setError] = useState(null);
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
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, []);

  return (
    <MoviePlayerWrapper>
      <ReturnButton onClick={() => navigate(-1)}>go back</ReturnButton>
      {error && error.message}
      <ReactPlayer
        url={movieData.ContentUrl}
        playing={true}
        controls={true}
        width="100%"
        height="100%"
      />
    </MoviePlayerWrapper>
  );
};
