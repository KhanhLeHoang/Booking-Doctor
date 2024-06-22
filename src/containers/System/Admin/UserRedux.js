import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { toast } from 'react-toastify';

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpenImage: false,

      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phonenumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      image: '',
      isActionCreate: true, // mode create (true) or edit user (false)
    }
  }

  async componentDidMount() {
    this.props.getGenderStart()
    this.props.getPositionStart()
    this.props.getRoleStart()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { genderRedux, positionRedux, roleRedux } = this.props
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        gender: (genderRedux && genderRedux.length > 0) ? genderRedux[0].keyMap : ''
      })
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        position: (positionRedux && positionRedux.length > 0) ? positionRedux[0].keyMap : ''
      })
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        role: (roleRedux && roleRedux.length > 0) ? roleRedux[0].keyMap : ''
      })
    }
    if (prevProps.users !== this.props.users) {
      this.setState({
        isActionCreate: true,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
        image: '',
        gender: (genderRedux && genderRedux.length > 0) ? genderRedux[0].keyMap : '',
        role: (roleRedux && roleRedux.length > 0) ? roleRedux[0].keyMap : '',
        position: (positionRedux && positionRedux.length > 0) ? positionRedux[0].keyMap : '',
      })
    }
  }

  handleOnChangeImage = async (event) => {
    let selectedFile = event.target.files[0]
    if (selectedFile) {
      let base64 = await CommonUtils.getBase64(selectedFile)
      // let objUrl = URL.createObjectURL(selectedFile)
      this.setState({
        image: base64
      })
    }
  }

  handleOnClickImage = () => {
    this.setState({
      isOpenImage: true
    })
  }

  handleOnClickActionCreate = () => {
    let { genderRedux, positionRedux, roleRedux } = this.props
    this.setState({
      isActionCreate: true,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phonenumber: '',
      address: '',
      image: '',
      gender: (genderRedux && genderRedux.length > 0) ? genderRedux[0].keyMap : '',
      role: (roleRedux && roleRedux.length > 0) ? roleRedux[0].keyMap : '',
      position: (positionRedux && positionRedux.length > 0) ? positionRedux[0].keyMap : '',
    })
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state }
    copyState[id] = event.target.value
    this.setState({
      ...copyState
    })
  }

  isAcceptableInput = () => {
    let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber']
    let arrConvertToNormalWord = ['email', 'password', 'first name', 'last name', 'phone number']
    for (let i = 0; i < arrCheck.length; ++i) {
      if (!this.state[arrCheck[i]]) {
        toast.error(`Missing ${arrConvertToNormalWord[i]}!`)
        return false
      }
    }
    return true
  }

  handleSaveUser = () => {
    if (!this.isAcceptableInput()) return
    if (this.state.isActionCreate) {  // mode create
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image
      })
    } else {        // mode edit
      this.props.editUserStart({
        id: this.state.id,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image
      })
    }
  }

  handleEditUser = (user) => {
    let imageBase64 = ''
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary')
    }

    this.setState({
      isActionCreate: false,
      id: user.id,
      email: user.email,
      password: '*********',
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phonenumber: user.phonenumber,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      image: imageBase64,
    })
  }

  render() {
    let { isOpenImage, email,
      password, firstName, lastName, phonenumber,
      address, gender, position, role, image, isActionCreate } = this.state
    let { language, genderRedux, positionRedux, roleRedux, isLoadingGender } = this.props
    return (
      <div className='user-redux-container'>
        <div className="title" ><FormattedMessage id='menu.admin.crud-redux' /></div>
        <div className='user-redux-body'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 my-3'>
                <button className='btn btn-primary' onClick={() => this.handleOnClickActionCreate()}>
                  <FormattedMessage id="manage-user.add" />
                </button>
              </div>
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.email" /></label>
                <input className='form-control' type='email' value={email}
                  onChange={(event) => this.handleOnChangeInput(event, 'email')}
                />
              </div>
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.password" /></label>
                <input className='form-control' type='password' value={password} disabled={!isActionCreate}
                  onChange={(event) => this.handleOnChangeInput(event, 'password')} />
              </div>
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.firstName" /></label>
                <input className='form-control' type='text' value={firstName}
                  onChange={(event) => this.handleOnChangeInput(event, 'firstName')} />
              </div>
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.lastName" /></label>
                <input className='form-control' type='text' value={lastName}
                  onChange={(event) => this.handleOnChangeInput(event, 'lastName')} />
              </div>
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                <input className='form-control' type='text' value={phonenumber}
                  onChange={(event) => this.handleOnChangeInput(event, 'phonenumber')} />
              </div>
              <div className='col-9'>
                <label><FormattedMessage id="manage-user.address" /></label>
                <input className='form-control' type='text' value={address}
                  onChange={(event) => this.handleOnChangeInput(event, 'address')} />
              </div>
              {/* gender */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.gender" /></label>
                <select className='form-control'
                  onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                  value={gender}
                >
                  {!isLoadingGender && genderRedux && genderRedux.length > 0 ? genderRedux.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                      </option>
                    )
                  })
                    :
                    <>
                      <option select="true" hidden={true}></option>
                      <option disabled={true}>Is loading...</option>
                    </>
                  }
                </select>
              </div>
              {/* position */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.position" /></label>
                <select className='form-control'
                  onChange={(event) => this.handleOnChangeInput(event, 'position')}
                  value={position}
                >
                  {positionRedux && positionRedux.length > 0 ? positionRedux.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                      </option>
                    )
                  })
                    :
                    <>
                      <option select="true" hidden={true}></option>
                      <option disabled={true}>Is loading...</option>
                    </>
                  }
                </select>
              </div>
              {/* role */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.role" /></label>
                <select className='form-control'
                  onChange={(event) => this.handleOnChangeInput(event, 'role')}
                  value={role}
                >
                  {roleRedux && roleRedux.length > 0 ? roleRedux.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                      </option>
                    )
                  })
                    :
                    <>
                      <option select="true" hidden={true}></option>
                      <option disabled={true}>Is loading...</option>
                    </>
                  }
                </select>
              </div>
              {/* load image */}
              <div className='col-3'>
                <label><FormattedMessage id="manage-user.image" /></label>
                <div className='preview-img-container'>
                  <input id='previewImg' type='file' hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className='label-upload' htmlFor='previewImg'><FormattedMessage id='manage-user.upload' /><i className=' fas fa-upload'></i></label>
                  {image &&
                    <div className='preview-image'
                      style={{ backgroundImage: `url(${this.state.image})` }}
                      onClick={() => this.handleOnClickImage()}
                    >
                    </div>
                  }
                </div>
              </div>
              {/* button save */}
              <div className='col-12 my-3'>
                <button className='btn btn-primary'
                  onClick={() => this.handleSaveUser()}
                ><FormattedMessage id="manage-user.save" /></button>
              </div>

              <div className='col-12 mb-5'>
                <TableManageUser editFromParent={this.handleEditUser} />
              </div>
            </div>
          </div>
        </div>

        {
          isOpenImage === true &&
          <Lightbox
            mainSrc={image}
            onCloseRequest={() => this.setState({ isOpenImage: false })}
          />
        }
      </div >
    )
  }

}


const mapStateToProps = state => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genderRedux,
    positionRedux: state.admin.positionRedux,
    roleRedux: state.admin.roleRedux,
    isLoadingGender: state.admin.isLoadingGender,
    users: state.admin.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (userData) => dispatch(actions.createNewUserStart(userData)),
    editUserStart: (userData) => dispatch(actions.editUserStart(userData)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
