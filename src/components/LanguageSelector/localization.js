import LocalizedStrings from 'react-localization';

export const CODE_ENG = 'ENG';
export const CODE_RUS = 'RUS';
export const CODE_UA = 'UA';

export const defaultLanguageCode = CODE_ENG;

const strings = new LocalizedStrings({
  [CODE_ENG]: {
    appDescription: 'Everything you should know about your heart',
    chooseFile: 'Choose a file',
    ecgResultTitle: 'Your ECG result',
    baseLineY: 'ECG base line coordinates (px)',
    cellsSize: 'Cells size (px)',
    ecgLetters: 'ECG letters',
    ecgLettersDetailed: 'ECG letters (full)',
    diseaseResult: 'Disease result',
    diseaseResultMark: 'Disease title',
    showExamples: 'Show examples',
    or: 'or',
    hideExamples: 'Hide examples',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    signupButtonText: 'Sign up',
    loginButtonText: 'Log in',
    logoutButtonText: 'Log out',
  },
  [CODE_RUS]: {
    appDescription: 'Всё, что Вам следует знать о своём сердце',
    chooseFile: 'Выберите файл',
    ecgResultTitle: 'Данные Вашей ЭКГ',
    baseLineY: 'Координаты базовой линии (пиксели)',
    cellsSize: 'Размер клеток (пиксели)',
    ecgLetters: 'Лексема ЭКГ',
    ecgLettersDetailed: 'Расширенная лексема ЭКГ',
    diseaseResult: 'Результат анализа ЭКГ',
    diseaseResultMark: 'Патология',
    showExamples: 'Показать примеры',
    or: 'или',
    hideExamples: 'Спрятать примеры',
    emailLabel: 'Электронная почта',
    passwordLabel: 'Пароль',
    signupButtonText: 'Зарегистрироваться',
    loginButtonText: 'Войти',
    logoutButtonText: 'Выйти',
  },
  [CODE_UA]: {
    appDescription: 'Все, що Вам слід знати про своє серце',
    chooseFile: 'Оберіть файл',
    ecgResultTitle: 'Дані вашої ЕКГ',
    baseLineY: 'Координати базової лінії (пікселі)',
    cellsSize: 'Розмір клітинок (пікселі)',
    ecgLetters: 'Лексема ЕКГ',
    ecgLettersDetailed: 'Розширена лексема ЕКГ',
    diseaseResult: 'Результат аналізу ЕКГ',
    diseaseResultMark: 'Хвороба',
    showExamples: 'Показати приклади',
    or: 'або',
    hideExamples: 'Сховати приклади',
    emailLabel: 'Електронна скринька',
    passwordLabel: 'Кодове слово',
    signupButtonText: 'Зареєструватися',
    loginButtonText: 'Увійти',
    logoutButtonText: 'Вийти',
  },
});

export default strings;
