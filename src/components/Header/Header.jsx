import React, { PureComponent } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { AppLogo, HeaderContainer } from './Header.styled';

class Header extends PureComponent {
  render() {
    return (
      <div>
        <HeaderContainer>
          <h1>
            Din-Don
            <AppLogo>❤</AppLogo>
          </h1>
        </HeaderContainer>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/signup">
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </div>
    );
  }
}

export default Header;
