import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:443/`,
});

export default instance;
