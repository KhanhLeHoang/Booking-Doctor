import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router'

class HomeHeader extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }

  handleOnClickLogo = () => {
    this.props.history.push('/home')
  }

  render() {
    let language = this.props.language
    return (
      <>
        <div className='home-header-container'>
          <div className='home-header-content'>
            <div className='left-content'>
              <img className='header-logo' src={logo} onClick={() => this.handleOnClickLogo()} />
            </div>
            <div className='center-content'>
              <div className='child-content'>
                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
              </div>
              <div className='child-content'>
                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                <div className='subs-title'><FormattedMessage id="home-header.select-room" /></div>
              </div>
              <div className='child-content'>
                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                <div className='subs-title'><FormattedMessage id="home-header.select-doctor" /></div>
              </div>
              <div className='child-content'>
                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                <div className='subs-title'><FormattedMessage id="home-header.check-health" /></div>
              </div>
            </div>
            <div className='right-content'>
              <div className='support'><i className='fas fa-question-circle'></i><FormattedMessage id="home-header.support" /></div>
              <div className={language === LANGUAGES.VI ? 'language active' : 'language'}><span onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>VN</span></div>
              <div className={language === LANGUAGES.EN ? 'language active' : 'language'}><span onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>EN</span></div>
            </div>
          </div>
        </div>
      </>
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
