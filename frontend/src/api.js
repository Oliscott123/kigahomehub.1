import axios from 'axios';

const defaultApiUrl = import.meta.env.PROD ? '/api' : 'http://localhost:4000/api';
export const API_BASE_URL = import.meta.env.VITE_API_URL || defaultApiUrl;
export const API_ORIGIN = API_BASE_URL.startsWith('http')
  ? new URL(API_BASE_URL).origin
  : window.location.origin;

export function assetUrl(path) {
  if (!path || path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
