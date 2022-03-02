import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { MovieCard, ImageContainer, Image } from './Movie.styles';

export const Movie = ({ Id, Title, Images, Description }) => {
  return (
    <MovieCard key={Id}>
      <h4>{Title}</h4>
      <ImageContainer>
        <Image>
          <img src={Images[0]?.Url} alt={Title} />
        </Image>
      </ImageContainer>
      <p>{Description}</p>

      <Link to={`/${Id}`}>
        <Button>Play</Button>
      </Link>
    </MovieCard>
  );
};
