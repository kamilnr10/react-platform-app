import React, { useState, useEffect } from 'react';
import { useUserAuth } from 'context/UserAuthContext';
import { fetchData } from 'helpers/fetchData';
import { Movie } from 'components/organisms/Movie/Movie';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { PaginationWrapper } from './Dashboard.styles';

const Dashboard = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

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
    setTimeout(() => {
      fetchData('https://thebetter.bsgroup.eu/Media/GetMediaList', token, data)
        .then((data) => {
          setMoviesList(data.Entities);
          setIsLoading(false);
        })
        .catch((error) => setError(error.message));
    }, 1000);
  }, []);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    fetchData('https://thebetter.bsgroup.eu/Media/GetMediaList', token, {
      MediaListId: selectedPage + data.MediaListId,
      IncludeCategories: false,
      IncludeImages: true,
      IncludeMedia: false,
      PageNumber: 1,
      PageSize: 15,
    })
      .then((data) => {
        setMoviesList(data.Entities);
      })
      .catch((error) => setError(error.message));
    setOffset(selectedPage + 1);
  };

  return (
    <div>
      <PaginationWrapper>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={3}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </PaginationWrapper>
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        moviesList.map((movie) => <Movie key={movie.Id} {...movie} />)
      )}
    </div>
  );
};

export default Dashboard;
