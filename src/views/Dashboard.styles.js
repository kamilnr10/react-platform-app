import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;

    li {
      width: 25px;
      padding: 5px;
      margin: 10px 20px;
      border-radius: 5px;
      text-align: center;
      list-style: none;

      &.active {
        background-color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;
