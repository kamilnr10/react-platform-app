import styled from 'styled-components';

export const MovieCard = styled.div`
  max-width: 768px;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  padding: 30px;
  margin: 30px auto;
  border-radius: 25px;
  box-shadow: 0px 7px 20px 4px rgba(236, 232, 253, 1);
  overflow: hidden;
  z-index: 10;

  p {
    font-size: ${({ theme }) => theme.fontSize.m};
  }

  @media (min-width: 768px) {
    p {
      font-size: ${({ theme }) => theme.fontSize.l};
    }
  }
`;

export const ImageContainer = styled.div`
  max-width: inherit;
`;

export const Image = styled.div`
  /* position: relative;
  padding-bottom: 56.2%; */
  /* border: 1px solid #686868; */
  position: relative;
  width: 100%;
  margin: 10px 0;
  padding-top: 56.25%;

  img {
    /* border: 2px solid red; */
    border-radius: 8px;
    position: absolute;
    width: auto;
    max-height: 100%;
    left: 50%;
    position: absolute;
    top: 50%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
  }
`;
