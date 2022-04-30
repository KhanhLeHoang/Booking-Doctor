import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant'
import { withRouter } from 'react-router'

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topDoctors: [],
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({ topDoctors: this.props.topDoctors })
    }
  }

  handleOnClickViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`)
  }

  render() {
    let { topDoctors } = this.state
    let { language } = this.props
    return (
      <div className='section-share section-doctor'>
        <div className='section-container'>
          <div className='section-header'>
            <span className='title-section'><FormattedMessage id={'homepage.outstanding-doctor'} /></span>
            <button className='btn-section'><FormattedMessage id={'homepage.more-info'} /></button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              {topDoctors && topDoctors.length > 0 && topDoctors.map((item, index) => {
                let imageBase64 = ''
                if (item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                }
                let nameVi = `${item.positionData.value_vi} ${item.lastName} ${item.firstName}`
                let nameEn = `${item.positionData.value_en} ${item.firstName} ${item.lastName}`
                return (
                  <div className='section-customize' key={index} onClick={() => this.handleOnClickViewDetailDoctor(item)}>
                    <div className='border-doctor'>
                      <div className='outer-bg'>
                        <div className='bg-image section-doctor' style={{ backgroundImage: `url(${imageBase64})` }} />
                      </div>
                      <div className='position text-center'>
                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div>Đa khoa</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctorsStart(limit)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
