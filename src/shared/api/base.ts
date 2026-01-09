import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'https://bank.gov.ua/NBUStatService/v1/statdirectory',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);
