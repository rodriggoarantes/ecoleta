import axios from 'axios';

const api = axios.create({
  baseURL: 'https://<SERVER:PORT>',
});

export default api;
