import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { getScheduleService } from '../../../services/userService'
import * as actions from '../../../store/actions';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';

class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(new Date(new Date().setHours(0, 0, 0, 0)), "DD-MM-YYYY", "Asia/Ho_Chi_Minh").unix(),
      rangeTime: []
    }
  }

  componentDidMount() {
    this.props.fetchAllcodeScheduleTimeStart()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { currentDate, rangeTime } = this.state
    let { scheduleTimes, doctorIdFromParents } = this.props
    let emptyScheduleTimes = []
    if (!rangeTime.length || currentDate !== prevState.currentDate || prevProps.doctorIdFromParents !== doctorIdFromParents) {
      if (scheduleTimes && scheduleTimes.length > 0) {
        emptyScheduleTimes = scheduleTimes.map(item => ({ ...item, isSelected: false }))
        this.setState({
          rangeTime: emptyScheduleTimes
        })
      }
      let res = await getScheduleService(doctorIdFromParents, currentDate)
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
          rangeTime: copyRangeTime
        })
      }
    }
  }

  handleOnChangeDate = (event) => {
    this.setState({
      currentDate: event.target.value
    })
  }

  handleOnClickBtnTime = (time) => {
    let { rangeTime } = this.state
    rangeTime.forEach(item => {
      if (item.id === time.id && item.isSelected === false) {
        let input = prompt(this.props.language === LANGUAGES.VI ? "Nh???p s??? ??i???n tho???i c???a b???n ????? ?????t l???ch:" : "Please enter your phone number to booking schedule:");
        if (input == null || input == "" || isNaN(input) || input.length < 10 || input.length > 12) {
          toast.error(this.props.language === LANGUAGES.VI ? "S??? ??i???n tho???i ch??a ????ng, ?????t l???ch th???t b???i!" : "Invalid phone number, booking schedule failed!")
        } else {
          toast.success(this.props.language === LANGUAGES.VI ?
            `C???m ??n b???n ???? ?????t l???ch h???n, ch??ng t??i s??? li??n h??? l???i b???n qua s??? ??i???n tho???i ${input} trong th???i gian s???m nh???t!`
            : `Thank you for booking schedule, we will contact to phone number ${input} soon!`)
        }
      }
    })
  }

  render() {
    let { rangeTime, currentDate } = this.state
    let { language } = this.props
    return (
      <>
        <div className='select-container'>
          <select onChange={(event) => this.handleOnChangeDate(event)}>
            <option value={moment(new Date(new Date().setHours(0, 0, 0, 0)), "DD-MM-YYYY", "Asia/Ho_Chi_Minh").unix()}>
              {language === LANGUAGES.VI ? "H??m nay - " + moment(new Date()).format('DD/MM') : "Today - " + moment(new Date()).locale('en').format('DD/MM')}
            </option>
            <option value={moment(new Date(new Date().setHours(0, 0, 0, 0)), "DD-MM-YYYY", "Asia/Ho_Chi_Minh").add(1, 'd').unix()}>
              {language === LANGUAGES.VI ? moment(new Date()).add(1, 'd').format('dddd - DD/MM').charAt(0).toUpperCase()
                + moment(new Date()).add(1, 'd').format('dddd - DD/MM').slice(1)
                : moment(new Date()).add(1, 'd').locale('en').format('ddd - DD/MM')}
            </option>
            <option value={moment(new Date(new Date().setHours(0, 0, 0, 0)), "DD-MM-YYYY", "Asia/Ho_Chi_Minh").add(2, 'd').unix()}>
              {language === LANGUAGES.VI ? moment(new Date()).add(2, 'd').format('dddd - DD/MM').charAt(0).toUpperCase()
                + moment(new Date()).add(2, 'd').format('dddd - DD/MM').slice(1)
                : moment(new Date()).add(2, 'd').locale('en').format('ddd - DD/MM')}
            </option>
          </select>
          <div className='text-schedule'>
            <i className='fas fa-calendar-alt'></i>
            <span><FormattedMessage id='homepage.schedule' /></span>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-12 schedule-container'>
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
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    scheduleTimes: state.admin.scheduleTimes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllcodeScheduleTimeStart: () => dispatch(actions.fetchAllcodeScheduleTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
