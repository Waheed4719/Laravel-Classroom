import axios from 'axios'
import {expiredToken, idNotFound} from './errorTypes'
// import {useHistory} from 'react-router-dom'
import { message } from 'antd';

axios.interceptors.response.use((response) => {
    return response
 }, function (error) {
    const originalRequest = error.config;
 
    // if (error.response.status === 401) {
    //     console.log(error.response.data)
    //     // localStorage.removeItem('auth_token')
    //     window.location=('http://laraexams.test/login');
    //     return Promise.reject(error);
    // }
 
    if ((error.response.status === 401 || error.response.data.message === idNotFound) && !originalRequest._retry) {
        originalRequest._retry = true;
        const ftoken = localStorage.getItem('faculty_token')
        const token = localStorage.getItem('auth_token')
        console.log(ftoken)
        console.log(token)
        if(localStorage.getItem('auth_token')!==null){
            console.log(localStorage.getItem('auth_token'))
            return axios.get('/api/refreshToken')
            .then(res => {
                console.log(res.data)
                if (res.status === 201 || res.status === 200) {
                    localStorage.setItem('auth_token','Bearer ' + res.data.token);
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token');
                    originalRequest.headers.Authorization = localStorage.getItem('auth_token');
                    return axios(originalRequest);
                }
            })
        }

        
        else if(localStorage.getItem('faculty_token')!==null){
            console.log(localStorage.getItem('faculty_token'))
            return axios.get('/api/faculty/refreshToken')
            .then(res => {
                console.log(res.data)
                if (res.status === 201 || res.status === 200) {
                    localStorage.setItem('faculty_token','Bearer ' + res.data.token);
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('faculty_token');
                    originalRequest.headers.Authorization = localStorage.getItem('faculty_token');
                    return axios(originalRequest);
                }
            })
        }


      
    }
    return Promise.reject(error);
 });