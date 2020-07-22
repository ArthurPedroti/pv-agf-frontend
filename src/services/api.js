import axios from 'axios';

const localMode = localStorage.getItem('@ASA');

const api = axios.create({
  baseURL:
    localMode === 'on'
      ? 'https://192.168.2.250/'
      : process.env.REACT_APP_SERVER,
});

export default api;
