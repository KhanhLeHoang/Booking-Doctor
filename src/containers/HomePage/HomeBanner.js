import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBanner.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';


class HomeBanner extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }

  render() {
    let language = this.props.language
    return (
      <>
        <div className='home-header-banner'>
          <div className='content-up'>
            <div className='title1'><FormattedMessage id="banner.title1" /></div>
            <div className='title2'><FormattedMessage id="banner.title2" /></div>
            <div className='search'>
              <i className='fas fa-search'></i>
              <input className='text' placeholder={language === LANGUAGES.VI ? "Tìm kiếm..." : "Search..."} />
            </div>
          </div>
          <div className='content-down'>
            <div className='options'>
              <div className='options-child'>
                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                <div className='text-child'><FormattedMessage id="banner.child1" /></div>
              </div>
              <div className='options-child'>
                <div className='icon-child'><i className='fas fa-procedures'></i></div>
                <div className='text-child'><FormattedMessage id="banner.child2" /></div>
              </div>
              <div className='options-child'>
                <div className='icon-child'><i className='fas fa-flask'></i></div>
                <div className='text-child'><FormattedMessage id="banner.child3" /></div>
              </div>
              <div className='options-child'>
                <div className='icon-child'><i className='fas fa-user-md'></i></div>
                <div className='text-child'><FormattedMessage id="banner.child4" /></div>
              </div>
              <div className='options-child'>
                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                <div className='text-child'><FormattedMessage id="banner.child5" /></div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
