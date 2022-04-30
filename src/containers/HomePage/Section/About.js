import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class About extends Component {

  render() {
    return (
      <div className='section-share section-about'>
        <div className='section-about-header'>
          <FormattedMessage id='about.social-media' />
        </div>
        <div className='section-about-content'>
          <iframe width="700px"
            height="400px"
            src="https://www.youtube.com/embed/FyDQljKtWnI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
