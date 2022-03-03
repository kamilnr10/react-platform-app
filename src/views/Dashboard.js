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

    fetchData('https://thebetter.bsgroup.eu/Media/GetMediaList', token, data)
      .then((data) => {
        setMoviesList(data.Entities);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    fetchData('https://thebetter.bsgroup.eu/Media/GetMediaList', token, {
      MediaListId: selectedPage + data.MediaListId,
      IncludeCategories: false,
      IncludeImages: true,
      IncludeMedia: false,
      PageNumber: 1,
      PageSize: 15,
    })
      .then((data) => {
        console.log('handleClick: ', data.Entities);
        setMoviesList(data.Entities);
      })
      .catch((err) => console.log(err));
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
      {moviesList.map((movie) => (
        <Movie key={movie.Id} {...movie} />
      ))}
    </div>
  );
};

export default Dashboard;
