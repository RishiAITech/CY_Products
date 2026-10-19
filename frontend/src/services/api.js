import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api', // Vite proxy isse http://localhost:5001/api par bhej dega
// });

const api = axios.create({
  baseURL: 'https://cy-products.vercel.app/api', // Backend URL + /api
});

// Har request ke saath token bhejne ke liye interceptor
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default api;