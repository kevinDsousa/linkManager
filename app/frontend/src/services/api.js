import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: 'http://localhost:3000',
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