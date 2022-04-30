import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import UserRedux from './UserRedux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.props.fetchAllUsersStart()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users
      })
    }
  }

  handleOnClickEdit = (user) => {
    this.props.editFromParent(user)
  }

  handleOnClickDelete = (userId) => {
    this.props.deleteUserStart(userId)
  }

  render() {
    let users = this.state.users
    return (
      <>
        <table id='TableManageUser'>
          <tbody>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </tbody>
          {users && users.length > 0 && users.map((item, index) => {
            return (
              <tbody key={item.id}>
                <tr>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>
                    <button className='btn-edit'
                      onClick={() => { this.handleOnClickEdit(item) }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className='btn-del'
                      onClick={() => { this.handleOnClickDelete(item.id) }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td></tr>
              </tbody>

            )
          })}

        </table>
      </>

    );
  }

}

const mapStateToProps = state => {
  return {
    users: state.admin.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserStart: (userId) => dispatch(actions.deleteUserStart(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
