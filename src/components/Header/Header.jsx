import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { AppLogo, HeaderContainer } from './Header.styled';
import { isLoggedInPT, localizationPT, userLogOutPT } from '../../helpers/proptypes.helper';
import { userLoggedOut } from '../../actions/userActions';
import imageHolder from '../../helpers/image-holder';

class Header extends PureComponent {
  static propTypes = {
    isLoggedIn: isLoggedInPT.isRequired,
    userLoggedOut: userLogOutPT.isRequired,
    localization: localizationPT.isRequired,
  };

  getHeaderForUser = () => (
    <Nav>
      <LinkContainer to="/login">
        <NavItem onClick={() => {
          this.props.userLoggedOut();
          imageHolder.resetImage();
        }}
        >
          {this.props.localization.logoutButtonText}
        </NavItem>
      </LinkContainer>
    </Nav>
  );

  getHeaderForGuest = () => (
    <Nav>
      <LinkContainer to="/signup">
        <NavItem>{this.props.localization.signupButtonText}</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>{this.props.localization.loginButtonText}</NavItem>
      </LinkContainer>
    </Nav>
  );

  render() {
    return (
      <div>
        <HeaderContainer>
          <h1>
            Din-Don
            <AppLogo>❤</AppLogo>
          </h1>
        </HeaderContainer>
        {
          this.props.isLoggedIn
            ? this.getHeaderForUser()
            : this.getHeaderForGuest()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    localization: state.appCommonParams.localization,
  };
}

export default connect(mapStateToProps, {
  userLoggedOut,
})(Header);
