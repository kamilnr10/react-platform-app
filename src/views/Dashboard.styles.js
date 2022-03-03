import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;

    li {
      padding: 5px;
      margin: 10px 8px;
      border-radius: 5px;
      list-style: none;
      display: flex;
      justify-content: center;
      cursor: pointer;

      &.active {
        background-color: ${({ theme }) => theme.colors.secondary};
      }

      a {
        width: 20px;
        text-align: center;
      }
    }
  }
`;
