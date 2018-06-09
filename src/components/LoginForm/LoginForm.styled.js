import styled from 'styled-components';
import { colors } from '../App/App.styled';

const errorHighlightStyles = `
  border: 1px solid ${colors.red};
  outline-color: ${colors.red};
`;

const CredentialsInput = styled.input.attrs({
  title: props => props.error,
})`
  ${props => (
    props.error
      ? errorHighlightStyles
      : ''
  )}
`;

export const UsernameInput = styled(CredentialsInput)``;
export const PasswordInput = styled(CredentialsInput)``;
