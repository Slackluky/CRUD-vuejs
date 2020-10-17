import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8088/api/';

class UserService {
  getUserBoard() {
    return axios.get(API_URL + 'user');
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}


export default new UserService();
