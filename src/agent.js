import axios from 'axios'
const API_ROOT = 'https://rick-backend-full.herokuapp.com';

axios.defaults.baseURL = API_ROOT
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'

const Auth = {
  login: (body) => axios.post('/login/student', body),
  register: (body) => axios.post('/login/register', body)
}

const Class = {
  createClass: (body) => axios.post('/class/new', body),
  getHotClass: () => axios.get('/class/all'),
  getClass: (body) => axios.post('/class/college', body),
  chosenCourse: (body) => axios.post('/class/chosen', body)
}

const Group = {
  createGroup: (body) => axios.post('/group/new', body),
  joinGroup: (body) => axios.post('/group/join', body),
  getGroups: (body) => axios.post('/group/all', body),
  getGroupInfo: (body) => axios.post('/group/info', body)
}

const Score = {
  addScore: (body) => axios.post('/score/add', body)
}

export default {
  Auth,
  Class,
  Group,
  Score
};