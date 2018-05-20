import styled from 'styled-components';
import { colors } from '../../App.styled';

const LanguageSelectorContainer = styled.div`
  .Select-control, .Select-menu-outer {
    width: 150px;
  }
  
  .Select-menu {
    text-align: left;
  }

  .Select-value,
  .Select-placeholder {
    cursor: pointer;
  }
`;

export const CountryFlag = styled.img`
  max-width: 24px;
  max-height: 24px;
`;

export const LanguageOptionLabel = styled.span`
  padding-left: 15px;
`;

export const LanguageOptionContainer = styled.div`
  display: flex;
  cursor: pointer;

  &:hover {
    background-color: ${colors.dark};
  }
`;

export default LanguageSelectorContainer;
