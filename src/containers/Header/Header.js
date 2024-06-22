import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import logo from '../../assets/logo.svg';
import _ from 'lodash';
import { withRouter } from 'react-router'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuApp: []
    }
  }
  componentDidMount() {
    let { userInfo } = this.props
    console.log(userInfo);
    let menu = []
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu
      }
    }
    this.setState({
      menuApp: menu
    })
  }

  handleOnClickLogo = () => {
    this.props.history.push('/home')
    console.log('ok')
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    // console.log(this.state.menuApp)

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
          <img className='header-logo' src={logo} onClick={() => this.handleOnClickLogo()} />
        </div>
        <div className='header-content-right'>
          <span className='welcome'>
            <FormattedMessage id='home-header.welcome' />, {userInfo && userInfo.firstName ? userInfo.firstName : ''}!
          </span>
          <span
            className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout} title='Log out'>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
