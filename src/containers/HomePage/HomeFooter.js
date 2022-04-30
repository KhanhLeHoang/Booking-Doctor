import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

  render() {
    return (
      <div className='home-footer'>
        <p>&copy; 2022 by Le Hoang Khanh</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
