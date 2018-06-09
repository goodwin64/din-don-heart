import React from 'react';

import Header from '../Header/Header';
import Routes from '../../routes';
import AppContainer from './App.styled';

export default class extends React.Component {
  render() {
    return (
      <AppContainer>
        <Header />
        <Routes />
      </AppContainer>
    );
  }
}
