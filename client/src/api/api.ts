import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://simplifymanagement-backend.onrender.com/'
});

export default axiosInstance;
