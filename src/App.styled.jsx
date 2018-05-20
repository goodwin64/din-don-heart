import 'react';
import styled from 'styled-components';

export const CanvasContainer = styled.div`
  position: relative;
  margin: 20px 0;
`;

export const ClearCanvasButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;

export const FilePickerInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const FilePickerLabel = styled.label`
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  padding: 5px 10px;
`;

export const FilePickerContainer = styled.div`  
  ${FilePickerInput}:focus + ${FilePickerLabel} {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }

  ${FilePickerInput}:focus + ${FilePickerLabel},
  ${FilePickerInput} + ${FilePickerLabel}:hover {
    background-color: red;
  }
`;
