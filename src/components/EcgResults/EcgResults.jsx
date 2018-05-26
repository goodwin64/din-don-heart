import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EcgResultContainer, EcgResultCanvas, ClearCanvasButton } from '../App/App.styled';
import { CLOSE_CHARACTER } from '../../constants';
import strings from '../../localization';
import { ecgLettersPT, diseaseResultPT, plotIndexPT } from '../../helpers/proptypes.helper';

class EcgResults extends Component {
  static propTypes = {
    baseLineY: PropTypes.number.isRequired,
    cellsSize: PropTypes.number.isRequired,
    plotIndices: PropTypes.arrayOf(plotIndexPT).isRequired,
    clearEcgResult: PropTypes.func.isRequired,
    resetCurrentFile: PropTypes.func.isRequired,
    currentImage: PropTypes.shape({}).isRequired, // image bitmap
    ecgLetters: ecgLettersPT.isRequired,
    ecgLettersDetailed: ecgLettersPT.isRequired,
    diseaseResult: diseaseResultPT.isRequired,
  };

  componentDidMount() {
    this.renderEcgImageResult(this.props);
  }

  componentWillReceiveProps(props) {
    this.clearCanvas();
    this.renderEcgImageResult(props);
  }

  clearCanvas = () => {
    const canvas = this.ecgCanvasOut;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  handleResultResetButton = () => {
    this.clearCanvas();
    this.props.clearEcgResult();
    this.props.resetCurrentFile();
  };

  /**
   * Renders a copy of image into canvas.
   * Keeps original aspect ratio.
   * Centers image inside canvas.
   */
  renderEcgImageResult = (props) => {
    const {
      currentImage: image,
      plotIndices,
      cellsSize,
      ecgLetters,
    } = props;

    const canvas = this.ecgCanvasOut;
    const ctx = canvas.getContext('2d');
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.min(hRatio, vRatio);
    const centerShiftX = (canvas.width - (image.width * ratio)) / 2;
    const centerShiftY = (canvas.height - (image.height * ratio)) / 2;
    ctx.drawImage(
      image, 0, 0, image.width, image.height,
      centerShiftX, centerShiftY, image.width * ratio, image.height * ratio,
    );

    ctx.font = `${cellsSize}px Georgia`;
    ctx.shadowColor = '#c20001';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#fff';
    plotIndices.forEach((yIndex, xIndex) => {
      const letter = ecgLetters[xIndex];
      const x = (xIndex * cellsSize * ratio) + centerShiftX;
      const y = (yIndex * ratio) + centerShiftY;
      ctx.fillText(letter, x, y);
    });
  };

  renderEcgTextResult() {
    return (
      <div className="ecg-result">
        <p>{strings.ecgResultTitle}:</p>
        <p>{strings.baseLineY}: {this.props.baseLineY}</p>
        <p>{strings.cellsSize}: {this.props.cellsSize}</p>
        <p>{strings.ecgLetters}: {this.props.ecgLetters}</p>
        <p>{strings.ecgLettersDetailed}: {this.props.ecgLettersDetailed}</p>
        <p>{strings.diseaseResult}: {this.props.diseaseResult}</p>
      </div>
    );
  }

  render() {
    return (
      <EcgResultContainer>
        <EcgResultCanvas
          height={240}
          width={720}
          innerRef={(node) => {
            this.ecgCanvasOut = node;
          }}
        />
        <ClearCanvasButton
          onClick={this.handleResultResetButton}
        >
          {CLOSE_CHARACTER}
        </ClearCanvasButton>
        {this.renderEcgTextResult()}
      </EcgResultContainer>
    );
  }
}

export default EcgResults;
