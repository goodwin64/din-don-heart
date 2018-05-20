import 'react';
import styled from 'styled-components';

const colors = {
  black: '#444',
  red: '#f50000',
  white: '#fff',
};

const Button = styled.button`
  border: 0;
  background-color: ${colors.black};
  cursor: pointer;
  user-select: none;
  
  :hover {
    background-color: ${colors.red};
  }
`;

const CANVAS_WIDTH_PC = 720;
const CANVAS_HEIGHT_PC = CANVAS_WIDTH_PC / 3;

const CANVAS_WIDTH_MOBILE = 480;
const CANVAS_HEIGHT_MOBILE = CANVAS_WIDTH_MOBILE / 3;

export const ImageOutCanvas = styled.canvas`
  width: ${CANVAS_WIDTH_PC}px;
  height: ${CANVAS_HEIGHT_PC}px;
`;

export const CanvasContainer = styled.div`
  position: relative;
  margin: 20px auto;
  width: ${CANVAS_WIDTH_PC}px;
  height: ${CANVAS_HEIGHT_PC}px;
  
  @media only screen and (max-width: ${CANVAS_WIDTH_PC}px) {
    width: ${CANVAS_WIDTH_MOBILE}px;
    height: ${CANVAS_HEIGHT_MOBILE}px;

    ${ImageOutCanvas} {
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
  color: ${colors.white};
  font-size: 18px;
`;

export const FilePickerInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const FilePickerLabel = Button.extend`
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  display: inline-block;
  padding: 5px 10px;
`.withComponent('label');

export const FilePickerContainer = styled.div``;

export const AppDescription = styled.p``;
