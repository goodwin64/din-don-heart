/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events,max-len */
import React, { PureComponent } from 'react';
import { getEcgResult } from '../../helpers/image-parsing.helper';
import { ExampleImage, ExampleImageContainer, ExamplesContainer } from './EcgAnalysisExample.styled';

export default class EcgAnalysisExample extends PureComponent {
  onExampleSelect = (event) => {
    const img = event.target;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    const myData = context.getImageData(0, 0, img.width, img.height);
    console.log(getEcgResult(myData));
  };

  render() {
    return (
      <ExamplesContainer onClick={this.onExampleSelect}>
        <ExampleImageContainer>
          <ExampleImage src="/ECG-1.jpg" alt="ECG-1 - before" />
        </ExampleImageContainer>

        <ExampleImageContainer>
          <ExampleImage src="/ECG-2.jpg" alt="ECG-2 - before" />
        </ExampleImageContainer>

        <ExampleImageContainer>
          <ExampleImage src="/ECG-3.jpg" alt="ECG-3 - before" />
        </ExampleImageContainer>
      </ExamplesContainer>
    );
  }
}
