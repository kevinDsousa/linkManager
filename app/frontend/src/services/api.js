import axios from 'axios';
import { message } from 'antd';

const BASEURL = 'http://localhost';

const api = axios.create({
  baseURL: `${BASEURL}`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || 'Ocorreu um erro na requisição.';
    message.error(errorMessage);
    return Promise.reject(error);
  }
);

export default api;