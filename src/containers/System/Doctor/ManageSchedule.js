import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import * as actions from '../../../store/actions';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { LANGUAGES, dateFormat } from '../../../utils';
import { toast } from 'react-toastify';
import {
  saveBulkScheduleDoctorService, getScheduleService, deleteBulkSCheduleDoctorService
} from '../../../services/userService'
import { couldStartTrivia } from 'typescript';
import { FormattedMessage } from 'react-intl';

class ManageSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDoctors: [],
      selectedDoctor: '',
      currentDate: new Date(new Date().setHours(0, 0, 0, 0)),
      rangeTime: [],
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctorsStart()
    this.props.fetchAllcodeScheduleTimeStart()
  }

  async componentDidUpdate(prevProps, prevState) {
    let { selectedDoctor, currentDate, rangeTime } = this.state
    let scheduleTimes = this.props.scheduleTimes
    let emptyScheduleTimes = []
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        allDoctors: dataSelect
      })
    }

    if (selectedDoctor !== '' && currentDate && prevState.selectedDoctor !== selectedDoctor || prevState.currentDate !== currentDate) {
      if (scheduleTimes && scheduleTimes.length > 0) {
        emptyScheduleTimes = scheduleTimes.map(item => ({ ...item, isSelected: false }))
        this.setState({
          rangeTime: emptyScheduleTimes
        })
      }
      let res = await getScheduleService(selectedDoctor.value, moment(currentDate, "DD-MM-YYYY", "Asia/Ho_Chi_Minh").unix())
      if (res.errCode === 0 && res.data.length > 0) {
        let copyRangeTime = emptyScheduleTimes.map(item => {
          if (res.data.filter(i => i.timeType === item.keyMap).length > 0) {
            item.isSelected = true
          } else {
            item.isSelected = false
          }
          return item
        })
        this.setState({
          rangeTime: copyRangeTime,
        })
      }
    }
  }

  isValidDate = (dateObject) => {
    return new Date(dateObject)
      .toString() !== 'Invalid Date';
  }

  handleChangeSelectedDoctor = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  }

  buildDataInputSelect = (inputData) => {
    let result = []
    if (inputData && inputData.length > 0) {
      inputData.map(item => {
        let obj = {}
        obj.value = item.id
        obj.label = item.lastName + ' ' + item.firstName
        result.push(obj)
      })
    }
    return result
  }

  handleOnChangeDatePicker = (value, e) => {
    if (this.isValidDate(value)) {
      this.setState({
        currentDate: value[0]
      })
    }
  }

  handleOnClickBtnTime = (time) => {
    let { rangeTime } = this.state
    let copyRangeTime = rangeTime.map(item => {
      return item.id === time.id ? { ...item, isSelected: !item.isSelected } : item
    })
    this.setState({ rangeTime: copyRangeTime })
  }

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state
    if (!selectedDoctor) {
      toast.error("Invalid doctor!")
      return
    }
    if (!this.isValidDate(currentDate)) {
      toast.error("Invalid date!")
      return
    }
    let arrTimeToCreate = []
    let arrTimeIDToDelete = []
    let res = await getScheduleService(selectedDoctor.value, moment(currentDate, "DD-MM-YYYY", "Asia/Ho_Chi_Minh").unix())
    if (res.errCode === 0) {
      if (rangeTime && rangeTime.length > 0) {
        rangeTime.map(item => {
          // if schedule are not in database & being selected will be created new
          if (!res.data.filter(i => i.timeType === item.keyMap).length > 0 && item.isSelected) {
            let obj = {}
            obj.doctorId = selectedDoctor.value
            obj.date = moment(currentDate, "DD-MM-YYYY", "Asia/Ho_Chi_Minh").unix()
            obj.timeType = item.keyMap
            arrTimeToCreate.push(obj)
          } else {  // if schedule are already in database & not being selected will be deleted
            if (res.data.filter(i => i.timeType === item.keyMap).length > 0 && !item.isSelected) {
              arrTimeIDToDelete.push(res.data.filter(i => i.timeType === item.keyMap)[0].id)
            }
          }
        })
        if (arrTimeToCreate.length > 0) {
          let resSave = await saveBulkScheduleDoctorService({
            arrSchedule: arrTimeToCreate
          })
          if (resSave.errCode === 0) {
            toast.success("Create schedule succeed!")
          } else {
            toast.error("Error while create schedule, please try again!")
          }
        }

        if (arrTimeIDToDelete.length > 0) {
          let resDel = await deleteBulkSCheduleDoctorService(arrTimeIDToDelete)
          if (resDel.errCode === 0) {
            toast.success("Delete schedule succeed!")
          } else {
            toast.error("Error while delete schedule, please try again!")
          }
        }
      }
    }
    else {
      toast.error("Error from server while save schedule")
    }
  }

  render() {
    let { rangeTime, currentDate } = this.state
    let { language } = this.props
    return (
      <div className='manage-schedule-container'>
        <div className='m-s-title'>
          <FormattedMessage id='manage-schedule.title' />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-6 form-group'>
              <label><FormattedMessage id='manage-schedule.child1' /></label>
              <Select
                value={this.state.selectedDoctor}
                onChange={(doctor) => this.handleChangeSelectedDoctor(doctor)}
                options={this.state.allDoctors}
              />
            </div>
            <div className='col-6 form-group'>
              <label><FormattedMessage id='manage-schedule.child2' /></label>
              <DatePicker className='form-control'
                onChange={(value, e) => this.handleOnChangeDatePicker(value, e)}
                value={currentDate}
                minDate={(new Date()).setDate((new Date()).getDate() - 1)}
              />
            </div>
            <div className='col-12 pick-hour-container'>
              {rangeTime && rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button key={index} value={item.keyMap}
                      className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'}
                      onClick={() => this.handleOnClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                    </button>
                  )
                })
              }
            </div>
            <div className='col-12'>
              <button className='btn btn-primary btn-save-schedule'
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id='manage-schedule.save' />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    scheduleTimes: state.admin.scheduleTimes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllcodeScheduleTimeStart: () => dispatch(actions.fetchAllcodeScheduleTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
