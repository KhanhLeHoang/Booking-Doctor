import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginService } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';
import { LANGUAGES } from '../../utils';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    }
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleOnClickLogin = async () => {
    this.setState({ message: '' })
    try {
      let res = await handleLoginService(this.state.username, this.state.password)
      if (res && res.errCode !== 0)
        this.setState({
          message: res.message
        })
      if (res && res.errCode === 0) {
        this.props.userLoginSuccess(res.user)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data)
          this.setState({ message: error.response.data.message })
      }
      else {
        this.setState({ message: error.message })
      }
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleOnClickLogin()
    }
  }

  render() {
    const { lang } = this.props
    return (
      <div className='login__background'>
        <div className='login__container'>
          <div className='login__content row'>
            <div className='col-12 login__content--text'><FormattedMessage id='login.login' /></div>
            <div className='col-12 form-group login-input'>
              <label>Email</label>
              <input type='text' className='form-control' placeholder={lang === LANGUAGES.VI ? "Nhập địa chỉ email" : "Enter your's email"}
                value={this.state.username}
                onChange={(event) => { this.handleOnChangeUsername(event) }}
                onKeyPress={(event) => this.handleKeyPress(event)}
              />
            </div>
            <div className='col-12 form-group login-input'>
              <label><FormattedMessage id='login.password' /></label>
              <input type='password' className='form-control'
                placeholder={lang === LANGUAGES.VI ? 'Nhập mật khẩu' : 'Enter your password'}
                value={this.state.password}
                onChange={(event) => { this.handleOnChangePassword(event) }}
                onKeyPress={(event) => this.handleKeyPress(event)}
              />
              <span className='status'>{this.state.message}</span>
            </div>
            <div className='col-12'>
              <button className='btn-login'
                onClick={() => this.handleOnClickLogin()}
              ><FormattedMessage id='login.login' /></button>
            </div>
            <div className='col-12'>
              <span className='forgot-password'><FormattedMessage id='login.forgot-password' /></span>
            </div>
            {/* <div className='col-12 text-center'>
              <span><FormattedMessage id='login.social-login' /></span>
            </div> */}
            <div className='col-12 social-login'>
              <i className="fab google fa-google-plus-g"></i>
              <i className="fab fb fa-facebook"></i>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
