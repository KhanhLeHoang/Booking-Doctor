import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant';
import { getDetailInfoDoctorService } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      selectedDoctor: '',
      description: '',
      hasMarkdown: '',
      allDoctors: []
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctorsStart()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        allDoctors: dataSelect
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    })
  }

  handleSaveContentMarkdown = () => {
    this.props.saveInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      hasMarkdown: this.state.hasMarkdown
    })
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInfoDoctorService(selectedDoctor.value)
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasMarkdown: true
      })
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasMarkdown: false
      })
    }
  };

  handleOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  buildDataInputSelect = (inputData) => {
    let result = []
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {}
        obj.value = item.id
        obj.label = item.lastName + ' ' + item.firstName
        result.push(obj)
      })
    }
    return result
  }

  render() {
    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'><FormattedMessage id='manage-doctor.title' /></div>
        <div className='more-info'>
          <div className='content-left form-group'>
            <label><FormattedMessage id='manage-doctor.child1' /></label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.allDoctors}
            />
          </div>
          <div className='content-right'>
            <label><FormattedMessage id='manage-doctor.child2' /></label>
            <textarea className='form-control' rows='4'
              onChange={(e) => this.handleOnChangeDescription(e)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className='manage-doctor-editor'>
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={text => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button className='save-content-doctor'
          onClick={() => this.handleSaveContentMarkdown()}>
          Save
        </button>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
