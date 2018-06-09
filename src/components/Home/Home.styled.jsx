import 'react';
import styled from 'styled-components';

export const colors = {
  black: '#000',
  dark: '#444',
  red: '#f50000',
  white: '#fff',
};

export const Button = styled.button`
  border: 0;
  background-color: ${colors.dark};
  cursor: pointer;
  user-select: none;
  font-size: 1.25em;
  color: white;
  display: inline-block;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  font-weight: normal;
  
  :hover {
    background-color: ${colors.red};
  }
`;

const CANVAS_WIDTH_PC = 720;
const CANVAS_HEIGHT_PC = CANVAS_WIDTH_PC / 3;

const CANVAS_WIDTH_MOBILE = 480;
const CANVAS_HEIGHT_MOBILE = CANVAS_WIDTH_MOBILE / 3;

export const EcgResultCanvas = styled.canvas`
  width: ${CANVAS_WIDTH_PC}px;
  height: ${CANVAS_HEIGHT_PC}px;
`;

export const EcgResultContainer = styled.div`
  position: relative;
  margin: 20px auto;
  width: ${CANVAS_WIDTH_PC}px;
  
  @media only screen and (max-width: ${CANVAS_WIDTH_PC}px) {
    width: ${CANVAS_WIDTH_MOBILE}px;

    ${EcgResultCanvas} {
      width: ${CANVAS_WIDTH_MOBILE}px;
      height: ${CANVAS_HEIGHT_MOBILE}px;
    }
  }
`;

export const ClearCanvasButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: ${colors.white};
  font-size: 18px;
`;

export const AppDescription = styled.p``;
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
