import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const API_SERVER_URL = 'https://jsonplaceholder.typicode.com/'

const config: AxiosRequestConfig = {
            baseURL: API_SERVER_URL,
        };
const client: AxiosInstance = axios.create(config);

export default client;
