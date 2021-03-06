import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { EcgResultContainer, EcgResultCanvas, ClearCanvasButton } from '../Home/Home.styled';
import { CLOSE_CHARACTER } from '../../constants/constants';
import strings from '../LanguageSelector/localization';
import {
  ecgLettersPT,
  diseaseResultPT,
  plotIndexPT,
  resetEcgResultPT,
} from '../../helpers/proptypes.helper';
import { resetEcgResult } from '../../actions/actions';
import imageHolder from '../../helpers/image-holder';

class EcgResults extends Component {
  static propTypes = {
    baseLineY: PropTypes.number.isRequired,
    cellsSize: PropTypes.number.isRequired,
    plotIndices: PropTypes.arrayOf(plotIndexPT).isRequired,
    resetEcgResult: resetEcgResultPT.isRequired,
    ecgLetters: ecgLettersPT.isRequired,
    ecgLettersDetailed: ecgLettersPT.isRequired,
    diseaseResult: diseaseResultPT.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFullResultShown: false,
    };
  }

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
    this.props.resetEcgResult();
  };

  /**
   * Renders a copy of image into canvas.
   * Keeps original aspect ratio.
   * Centers image inside canvas.
   */
  renderEcgImageResult = (props) => {
    const {
      plotIndices,
      cellsSize,
      ecgLetters,
    } = props;

    const image = imageHolder.getImage();

    if (!image) return;

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
    const { isFullResultShown } = this.state;
    // 176.38.3.120
    return (
      <div className="ecg-result">
        <h3>{strings.ecgResultTitle}:</h3>
        <p>{strings.diseaseResult}: {this.props.diseaseResult.description}</p>
        {
          isFullResultShown && (
            <div>
              <p>{strings.baseLineY}: {this.props.baseLineY}</p>
              <p>{strings.cellsSize}: {this.props.cellsSize}</p>
              <p>{strings.ecgLetters}: {this.props.ecgLetters}</p>
              <p>{strings.ecgLettersDetailed}: {this.props.ecgLettersDetailed}</p>
              <p>{strings.diseaseResultMark}: {this.props.diseaseResult.mark}</p>
            </div>
          )
        }
        <button
          onClick={() => this.setState({ isFullResultShown: !isFullResultShown })}
        >
          Show {isFullResultShown ? 'less' : 'more'}
        </button>
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

function mapStateToProps(state) {
  return {
    currentLanguage: state.appCommonParams.currentLanguage,
    baseLineY: state.ecgResult.baseLineY,
    cellsSize: state.ecgResult.cellsSize,
    ecgLetters: state.ecgResult.ecgLetters,
    plotIndices: state.ecgResult.plotIndices,
    diseaseResult: state.ecgResult.diseaseResult,
    ecgLettersDetailed: state.ecgResult.ecgLettersDetailed,
  };
}

export default connect(mapStateToProps, {
  resetEcgResult,
})(EcgResults);
