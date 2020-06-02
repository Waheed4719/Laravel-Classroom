import axios from 'axios'
import {expiredToken, idNotFound} from './errorTypes'
// import {useHistory} from 'react-router-dom'
import { message } from 'antd';

axios.interceptors.response.use((response) => {
    return response
 }, function (error) {
    const originalRequest = error.config;
 
 
    if ((error.response.status === 401 || error.response.data.message === idNotFound) && !originalRequest._retry) {
        originalRequest._retry = true;
        
        const token = localStorage.getItem('auth_token')
      
        if(localStorage.getItem('auth_token')!==null){
            
            return axios.get('/api/refreshToken')
            .then(res => {
                
                if (res.status === 201 || res.status === 200) {
                    localStorage.setItem('auth_token','Bearer ' + res.data.token);
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token');
                    originalRequest.headers.Authorization = localStorage.getItem('auth_token');
                    return axios(originalRequest);
                }
            })
        }

    


      
    }
    return Promise.reject(error);
 });