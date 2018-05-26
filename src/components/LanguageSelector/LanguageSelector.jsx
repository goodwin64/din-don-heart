import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { CODE_ENG, CODE_RUS } from '../../helpers/localization';
import LanguageSelectorContainer, {
  CountryFlag, LanguageOptionContainer,
  LanguageOptionLabel,
} from './LanguageSelector.styled';

/**
 * Emoji flags not yet implemented in browsers, so base64 images were used
 */
const languageOptions = [
  { value: CODE_ENG, label: 'English', imgBase64: 'data:image/png;base64,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' },
  { value: CODE_RUS, label: 'Русский', imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADSUExURUdwTLu7vMXFxYEfGMXGx3wdFcLAwYR7hEwUK3MVDsjIyAYaXmsWD2sXEQwydaampsbGxsjIyG8WD24VD3MZE5OUlmgaFJeYl0csVU5mogQgZhUzfnaNuSFWtAAvkPz8+wU5l9pGO9jZ2eDg4O/v7gg/odDS0+fn5/b29bIhFRdOrRxTss0+NMMyJdRCN7gmGsk3Kw5Epr8qHRJJqY8eFgkvgLIyKZssJqMhFqm41i1TpV82YgAfbKSkpJpJYlN3uHeOvR5LoDoxbGdLg0tSlngvTD0VQF8AAAAddFJOUwD5RPz5pB4HCvvRqVyBoKF4rTq63aUdpaDpxu3tT15WKgAAA1RJREFUWMPt12lX2lAQBmAxYTGFEgLSfgHSsBgIIaxJwCqL8v//Umfm3tys0Khfenp4LdqD5PGdueG03t3dcsst/3fKpdI9S6lUKn9OuL9X1UZDUWRZLmCURkO9/xBGRkORR9HILEpDLYUvLF8zVGYY/X7/CQNfDcMIwYIqLq/XMxqWRQ/DQGIAMfETWQEFXwr14Npy/QXmVVVcHwvfhkwIGSakB48EBN82ItCPlwLsDzaoKAosE9fJXkRIYOCDSwwyUtDjC+1Rpo+RMDjC0qMPhII1ZTTiEPwUeL7PDT4PXo9/WEQjXikLIiY4mQHtZcAdEbMnKhm0Jbgi3YhJT0EfkxeKJbYkLJTdKCwUSL0E1DMHZggZmY34aAIyzQwncQcYF6B+ZNFZg2FAgTVst1uZ36nXRgugeCGzD9cfDvvd8Xgc6ro+PL7vD9tR/IaUs5yw0KAPxL7TsSar1WK4QKbb7W7goe/2h8doo8jh49Gzk6flcmNiWQBZkwlIHMLAXzbfA6jy7QQVo33Ye+FpBAT2QINFQF0B6VHo9wYrbrfs7AzcJRFQI0Q6qUabDIgNrB+Pu8nOOq4Wi8VqNZnEmezRkhB/Fg5jOORMGurkg/QucwRkXYKG8FJ+apcaDa82yjcaFcrXSKdGX9hRvNEm944+u+zUaF/d0eLijixxavpXdmR1rN1u9/72TDmdTptNF475gztC4fX1dTqdzue2bS+XjjP2vfPzKe+OQCJiOvuFmc0QWpIDcZa2d/4Zefdfuo+iBoOmScj1igIqrtdnmDiYDCB4876/JQxeiEEOh5wE5I8d1/POZ7bHM+0iYcShJTlZEDwH317a9pyCECQT4qu+DHHJ5s40BzTOgMYxaM4apVZEh3a9EauEjn1ltGmuRg5rZFOjWbrSLJiMM/5fIL5sVonfh7QdGMt1Xc/3/DXF9/2xm4ZilcRwFDpzNDxvLUkPYQDzopDEGzkxh44OZ2GEBGm1Ws1isYYpNpsttCQphJoP1HIckyiuMACoVTWt3a5U+L/PlUpbq9ZAizSikoQ5ruPyeHwSIqpaG4Dk/6HLwGm1qnhaqzVpYontcO3BQ5JEjXYl/y8JFa1aZCNTaBW1Dxoh1ta0Kguuonz7TfCWW/7F/AGarX3KM3AilgAAAABJRU5ErkJggg==' },
];

export default class LanguageSelector extends PureComponent {
  static propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
  };

  onLanguageSelect = (language) => {
    if (!language) { return; }
    this.props.onLanguageChange(language.value);
  };

  renderOption = option => (
    <LanguageOptionContainer>
      <CountryFlag src={option.imgBase64} alt={option.value} />
      <LanguageOptionLabel>{option.label}</LanguageOptionLabel>
    </LanguageOptionContainer>
  );

  render() {
    return (
      <LanguageSelectorContainer>
        <Select
          name="language"
          id="select-language"
          value={this.props.currentLanguage}
          onChange={this.onLanguageSelect}
          options={languageOptions}
          clearable={false}
          searchable={false}
          optionRenderer={this.renderOption}
        />
      </LanguageSelectorContainer>
    );
  }
}
