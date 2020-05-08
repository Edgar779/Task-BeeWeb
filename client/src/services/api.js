import axios from 'axios';
import config from "../config/config";
// const accessToken = localStorage.getItem('accessToken');
  const API = axios.create({
    baseURL: `${config.API_URL}`,
    // headers: {"Authorization" : `${accessToken ? accessToken : ''}`}
  });

//   export const refreshToken = function(token) {
//     API.defaults.headers['Authorization'] = `Bearer ${token ? token : ''}`;
//   };

 export default API;