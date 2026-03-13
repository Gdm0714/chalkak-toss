import axios from 'axios';
import {API_BASE_URL} from '../constants';
import {getSecurityHeaders} from './mtls';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const securityHeaders = getSecurityHeaders();
  Object.assign(config.headers, securityHeaders);
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (__DEV__) {
      console.warn('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
