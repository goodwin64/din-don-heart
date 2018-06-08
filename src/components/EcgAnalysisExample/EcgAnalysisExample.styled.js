import styled from 'styled-components';

export const ExamplesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
`;

const imageSize = 300;
export const ExampleImageContainer = styled.div`
  margin: 10px;
  width: ${imageSize}px;
`;

export const ExampleImage = styled.img`
  width: 100%;
  max-width: 300px;
  max-width: ${imageSize}px;
`;
