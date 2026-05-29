import axios from 'axios';

const defaultApiUrl = import.meta.env.PROD
  ? 'https://kigalihomehub-backend.onrender.com/api'
  : 'http://localhost:4000/api';
export const API_BASE_URL = import.meta.env.VITE_API_URL || defaultApiUrl;

function getApiOrigin(baseUrl) {
  if (baseUrl.startsWith('http')) {
    try {
      return new URL(baseUrl).origin;
    } catch {
      return window.location.origin;
    }
  }

  return window.location.origin;
}

export const API_ORIGIN = getApiOrigin(API_BASE_URL);

export function assetUrl(path) {
  if (!path || path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use((response) => {
  if (typeof response.data === 'string' && response.data.trim().startsWith('<')) {
    return Promise.reject(
      new Error('Backend API is not configured for this deployment. Set VITE_API_URL in Vercel.'),
    );
  }

  return response;
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
