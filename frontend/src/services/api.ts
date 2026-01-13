import axios from 'axios';

const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000/api';
    }
    let url = process.env.NEXT_PUBLIC_API_URL || 'https://minitask-i0z7.onrender.com/api';
    if (!url.endsWith('/api')) {
        url += '/api';
    }
    return url;
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
