import LocalizedStrings from 'react-localization';

export const CODE_ENG = 'ENG';
export const CODE_RUS = 'RUS';

const strings = new LocalizedStrings({
  [CODE_ENG]: {
    appDescription: 'Everything you should know about your heart',
    chooseFile: 'Choose a file',
    ecgResultTitle: 'Your ECG result',
    baseLineY: 'ECG base line coordinates (px)',
    cellsSize: 'Cells size (px)',
    ecgLetters: 'ECG letters',
  },
  [CODE_RUS]: {
    appDescription: 'Всё, что следует знать о Вашем сердце',
    chooseFile: 'Выберите файл',
    ecgResultTitle: 'Данные Вашей ЭКГ',
    baseLineY: 'Координаты базовой линии (пиксели)',
    cellsSize: 'Размер клеток (пиксели)',
    ecgLetters: 'Лексема ЭКГ',
  },
});

export default strings;
