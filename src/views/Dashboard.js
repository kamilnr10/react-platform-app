import React, { useState, useEffect } from 'react';
import { useUserAuth } from 'context/UserAuthContext';
import { fetchData } from 'helpers/fetchData';
import { Movie } from 'components/organisms/Movie/Movie';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  ul {
    display: flex;

    li {
      width: 25px;
      padding: 5px;
      margin: 10px 20px;
      text-align: center;
      list-style: none;

      &.active {
        background-color: lightblue;
      }
    }
  }
`;

const Dashboard = () => {
  const [moviesList, setMoviesList] = useState([]);
  const { isAuth, user } = useUserAuth();
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 3;

  const data = {
    MediaListId: 4,
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
        console.log(data.Entities);
        // console.log(isAuth);
        const slice = data.Entities.slice(offset, offset + perPage);
        const postMoviesList = slice.map((item) => (
          <Movie key={item.Id} {...item} />
        ));
        setMoviesList(postMoviesList);
        setPageCount(Math.ceil(data.Entities.length / perPage));
      })
      .catch((err) => console.log(err));
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
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
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </PaginationWrapper>
      {moviesList}
    </div>
  );
};

export default Dashboard;
