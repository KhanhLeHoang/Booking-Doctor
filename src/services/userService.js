import axios from "../axios"

const handleLoginService = (userEmail, userPassword) => {
  return axios.post('/api/login', {
    email: userEmail,
    password: userPassword
  })
}

const getAllUsersService = (userId) => {
  return axios.get(`/api/get-all-users?id=${userId}`)
}

const createUserService = (userData) => {
  return axios.post('/api/create-user', userData)
}

const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', {
    data: {
      id: userId
    }
  })
}

const editUserService = (userData) => {
  return axios.put('/api/edit-user', userData)
}

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorService = (limit) => {
  return axios.get(`/api/get-top-doctor?limit=${limit}`)
}

const getAllDoctorsService = () => {
  return axios.get('/api/get-all-doctors')
}

const saveInfoDoctorService = (data) => {
  return axios.post('/api/save-info-doctor', data)
}

const getDetailInfoDoctorService = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctorService = (data) => {
  return axios.post('/api/bulk-create-schedule', data)
}

const deleteBulkSCheduleDoctorService = (arrId) => {
  return axios.delete('/api/bulk-delete-schedule', {
    data: { arrId }
  })
}

const getScheduleService = (doctorId, date) => {
  return axios.get(`/api/get-schedule?doctorId=${doctorId}&date=${date}`)
}

export {
  handleLoginService, getAllUsersService, createUserService, getAllDoctorsService,
  deleteUserService, editUserService, getAllCodeService, getTopDoctorService,
  saveInfoDoctorService, getDetailInfoDoctorService, saveBulkScheduleDoctorService,
  getScheduleService, deleteBulkSCheduleDoctorService
}