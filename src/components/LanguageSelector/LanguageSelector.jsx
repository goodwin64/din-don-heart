import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

import { setLanguage } from '../../actions/onDiseaseResult';
import { setLanguagePT } from '../../helpers/proptypes.helper';
import strings, { CODE_ENG, CODE_RUS, CODE_UA, defaultLanguageCode } from './localization';

import LanguageSelectorContainer, {
  CountryFlag,
  LanguageOptionContainer,
  LanguageOptionLabel,
} from './LanguageSelector.styled';

/**
 * Emoji flags not yet implemented in browsers, so base64 images were used
 */
const languageOptions = [
  { value: CODE_ENG, label: 'English', imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAgVBMVEVHcEzPGyvPGyvPGyvu7u7kqK3PGyvu7u7u7u7u7u7SLj3u7u7f4efPGysPMYTs4eIAJH3krLHByNnq1NbgkpnQ1eCkr8tKY6BofK53ibbZXWhZcKezvNLVQ1AePYs8V5nXUFzmub3banTfhY3dd4DoxsktSpLTNUOGlr3RKDeVosSByXpFAAAAC3RSTlMAz2CvIO8gv89gryK6YvcAAAHeSURBVHhe7ZfXkqNADEWFBxzmNskxh4lh//8DtwvVLU+XAMPWPrk4r5hD01dGanlcBgZmEwBuW4TAk/4CniJk64DyaSRKPIWyzvqJsjWQv/or0Vg84wTEbfqINg54+Uo9P0ksIlH6DoLvrKso+wbwVl245piKjLzx9AGy+uwm+lwBH6dqOUt4ZvJcSZcg2HUR7QAsf9LbIibC5S1A5ud7ovMcyK+V/Q0KBNywEsRtW0QMvVrO1wuIMMI03ecg66xZxNA9r7/ukOJQ53ebepGGbt/hUIh/4yPfOCyEOlEYOjn6XRWTAVnViYLQg5xFq2KuPwgLwYrqHjjXyhNbp4sWEUMP/gsUKRe7iVYEE8qlKCgimS0EK2Lo9nshaMKKWnlkUfqfGEStDKJBNHyP7ouCj7/CHtAkWuzZ+N0f7UWmHSnsSlZEOCqYdqQNkrC1N4uwYJ/UBhm0bMLWfie1ZaqdO2zZOxCwtTcPEfaBHCLORxC29taxhrxzC6BjzcGZTWwdtEwopQ5aQega693Rj+T72x1i/J2GUfsOYkLvNB7bQpCJyaDjwB4WwrPMgtB7HCHCQhiJTMHQex1qwkKIRCROGHr/YxZJ9MAWMcL+Bz9lGosyeir//SiKyUweloGBv/mkyBCafKWfAAAAAElFTkSuQmCC' },
  { value: CODE_RUS, label: 'Русский', imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAHlBMVEVHcEzu7u7OICjOICju7u7u7u7OICju7u7OICgiQIw0yT+pAAAAB3RSTlMAx8dgYCAg36fI1gAAAG9JREFUSMdjYBgFdAeO5XiBCEhNYDkBIMrAwFpOEAQwMBJWJMDgTlhRCYM4YUWFDOVEgFFF1FQ0kwgwqmhU0VBW1EEEGFVETUUahNU0MVgQVtTMwERYkQIDG2FFCQwMSYTUqIGqTiP8apRHGyD0BwBQQt9+WdqzCAAAAABJRU5ErkJggg==' },
  { value: CODE_UA, label: 'Українська', imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAG1BMVEVHcEwAW7v/1QAAW7v/1QAAW7v/1QD/1QAAW7uIqOaMAAAAB3RSTlMAx8dgYCAg36fI1gAAAGpJREFUSMdjYBgFdAeGHXiBMEhNYAcBIMrAwNpBEAQwMBJWJMBgQVhRM4MEYUWNDB1EgFFFo4qGsqJyIsCoolFFQ1mROmE1RQzuhBWVMDARVqTAwEZYUQIDQxIhNWqgqtMJvxqV0QYI/QEAHf+XxuFYqnUAAAAASUVORK5CYII=' },
];

class LanguageSelector extends PureComponent {
  static propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    setLanguage: setLanguagePT.isRequired,
  };

  onLanguageSelect = (language) => {
    if (!language) { return; }

    const selectedLanguageCode = language.value;
    const currentLanguageCode = selectedLanguageCode || defaultLanguageCode;
    strings.setLanguage(currentLanguageCode);
    this.props.setLanguage(currentLanguageCode);
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

function mapStateToProps(state) {
  return {
    currentLanguage: state.appCommonParams.currentLanguage,
  };
}

export default connect(mapStateToProps, {
  setLanguage,
})(LanguageSelector);
