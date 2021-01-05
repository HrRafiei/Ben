import axios from 'axios';
const AppClient = axios.create();
AppClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
});
export default AppClient;