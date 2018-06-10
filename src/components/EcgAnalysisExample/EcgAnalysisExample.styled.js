import styled from 'styled-components';

export const ExamplesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  
  @media only screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

const imageSize = 300;
/**
 * height 130px - to prevent content jumps when image loaded with delay
 */
export const ExampleImageContainer = styled.div`
  margin: 10px;
  width: ${imageSize}px;
  height: 130px;
  display: flex;
`;

export const ExampleImage = styled.img`
  width: 100%;
  max-width: 300px;
  max-width: ${imageSize}px;
`;
