import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
  getAllUsersService,
  createUserService,
  deleteUserService,
  editUserService
} from '../../services/userService'
import ModalUser from './ModalUser';
import axios from 'axios';

class UserManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      modeModal: '',
      userEdit: {},
    }
  }

  async componentDidMount() {
    await this.getAllUserData()
  }

  getAllUserData = async () => {
    let response = await getAllUsersService('ALL')
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.data
      })
    }
  }

  handleOnClickAddUser = () => {
    this.setState({
      isOpenModal: true,
      modeModal: 'add'
    })
  }

  handleOnClickEdit = (userEdit) => {
    this.setState({
      isOpenModal: true,
      modeModal: 'edit',
      userEdit,
    })
  }

  handleOnClickDelete = async (userId) => {
    await deleteUserService(userId)
    this.getAllUserData()
  }

  createNewUser = async (userData) => {
    try {
      let response = await createUserService(userData)
      alert(response.message)
      this.getAllUserData()
    } catch (e) {
      console.log(e)
    }
  }

  saveEditUser = async (userData) => {
    try {
      let response = await editUserService(userData)
      if (response && response.errCode === 0) {
        this.getAllUserData()
      }
    } catch (e) {
      if (e.response && e.response.data) {
        console.log(e.response.data.message)
      }
    }
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModal: false
    })
  }

  render() {
    let { arrUsers } = this.state
    return (
      <div className='user-container'>
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggle={this.toggleUserModal}
          createNewUser={this.createNewUser}
          modeModal={this.state.modeModal}
          userEdit={this.state.userEdit}
          saveEditUser={this.saveEditUser}
        />
        <div className='title text-center'>Manage User</div>
        <div className='mx-1'>
          <button className='btn btn-primary px-3 ' onClick={() => this.handleOnClickAddUser()}><i className="fas fa-plus px-1"></i>Add new user</button>
        </div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </tbody>
            {
              arrUsers && arrUsers.map((item, index) => {
                return (
                  <tbody key={item.id}>
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className='btn-edit' onClick={() => { this.handleOnClickEdit(item) }}><i className="fas fa-pencil-alt"></i></button>
                        <button className='btn-del' onClick={() => { this.handleOnClickDelete(item.id) }}><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                )
              })
            }

          </table>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
