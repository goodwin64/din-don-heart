import React from 'react';

import Header from '../Header/Header';
import Routes from '../../routes';
import AppContainer from './App.styled';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      <AppContainer>
        <Header />
        <Routes childProps={childProps} />
      </AppContainer>
    );
  }
}
