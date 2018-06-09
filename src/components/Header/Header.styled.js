import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #222;
  padding: 20px;
  color: white;
  text-align: center;
`;

export const AppLogo = styled.span`
  animation: App-logo-heart-bit infinite 3s ease-in-out;
  color: #dc5759;

  @keyframes App-logo-heart-bit {
    50% {
      color: #df3937;
    }
  }
`;
