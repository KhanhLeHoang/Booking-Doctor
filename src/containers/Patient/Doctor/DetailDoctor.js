import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailDoctor.scss';
import { getDetailInfoDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailDoctor: {}
    }
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id
      let res = await getDetailInfoDoctorService(id)
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data
        })
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) { }

  render() {
    let { detailDoctor } = this.state
    let { language } = this.props
    let nameVi = '', nameEn = ''
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.value_vi} ${detailDoctor.lastName} ${detailDoctor.firstName}`
      nameEn = `${detailDoctor.positionData.value_en} ${detailDoctor.firstName} ${detailDoctor.lastName}`
    }
    return (
      <>
        <HomeHeader />
        <div className='doctor-detail-container'>
          <div className='intro-doctor'>
            <div className='content-left'
              style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
            ></div>
            <div className='content-right'>
              <div className='up'>
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className='down'>
                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                  <span>{detailDoctor.Markdown.description}</span>
                }
              </div>
            </div>
          </div>
          <div className='chedule-doctor'><DoctorSchedule doctorIdFromParents={detailDoctor.id} /></div>
          <div className='detail-info-doctor'>
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
              <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
            }
          </div>
          <HomeFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
