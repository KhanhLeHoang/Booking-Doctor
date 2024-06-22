import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoadingGender: false,
  genderRedux: [],
  roleRedux: [],
  positionRedux: [],
  users: [],
  topDoctors: [],
  isLoadingTopDoctors: false,
  allDoctors: [],
  scheduleTimes: []
}

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state }
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      copyState.isLoadingGender = true
      return {
        ...copyState,
      }
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.genderRedux = action.data
      copyState.isLoadingGender = false
      return {
        ...copyState,
      }
    case actionTypes.FETCH_GENDER_FAILED:
      copyState.isLoadingGender = false
      return {
        ...copyState,
      }
    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positionRedux = action.data
      return {
        ...copyState,
      }
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roleRedux = action.data
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      copyState.users = action.users
      copyState.isLoadingTopDoctors = true
      return {
        ...copyState,
      }
    case actionTypes.FETCH_TOP_DOCTORS_START:
      copyState.isLoadingTopDoctors = true
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ALL_USERS_FAILED:
      copyState.isLoadingTopDoctors = false
      return {
        ...copyState,
      }
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      copyState.isLoadingTopDoctors = false
      copyState.topDoctors = action.data
      return {
        ...copyState,
      }
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      copyState.allDoctors = action.data
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      copyState.scheduleTimes = action.data
      return {
        ...copyState,
      }
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      return {
        ...copyState,
      }
    default:
      return state;
  }
}

export default adminReducer;