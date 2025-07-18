import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

const backendAxiosInstance = axios.create({
  baseURL: CONFIG.laravelServerUrl,
});

backendAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || 'Something went wrong with Auth API!')
);

export { backendAxiosInstance };

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};
// ----------------------------------------------------------------------

export const backendFetcher = async (args, method = 'get', data = null) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await backendAxiosInstance({
      url,
      method,
      data,
      ...config,
    });
    if (config?.responseType === 'blob') {
      return res;
    }
    return res.data;
  } catch (error) {
    console.error('Failed to fetch from Auth API:', error);
    throw error;
  }
};

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  laravelAuth: {
    me: '/api/user',
    signIn: '/api/login',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  business: {
    import: '/api/businesses/import',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  user: {
    list: '/api/users',
    details: (id) => `/api/users/${id}`,
    edit: (id) => `/api/users/${id}`,
    delete: (id) => `/api/users/${id}`,
    create: '/api/register',
    changePassword: '/api/change/password',
  },
  msnproduct: {
    list: '/api/businesses',
    table: '/api/businesses/list',
    details: '/api/business/details',
    delete: '/api/delete/business',
    create: '/api/businesses/store',
    export: '/api/businesses/export',
    edit: (id) => `/api/edit/business/${id}`,
  },
  guest: {
    list: '/api/guest/businesses',
    table: '/api/businesses/list',
    details: (id) => `/api/guest/businesses/${id}`,
    delete: '/api/delete/business',
    create: '/api/businesses/store',
    edit: (id) => `/api/edit/business/${id}`,
  },
};
