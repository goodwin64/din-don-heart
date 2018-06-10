import styled from 'styled-components';

import { Button } from '../Home/Home.styled';

export const FilePickerInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const FilePickerLabel = Button.withComponent('label');
export const ShowExamplesButton = styled(Button)`
  outline: none;
  min-width: 150px;
`;
export const ButtonsDelimiter = styled.span`
  padding: 0 10px;
`;

export const FilePickerLabelText = styled.span``;
export const FilePickerContainer = styled.div``;
