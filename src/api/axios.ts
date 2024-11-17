import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_PROJECT_SERVER_URL as string,
  headers: {},
});

export default instance;
