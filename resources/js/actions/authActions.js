import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import * as Types from './types'
import setAuthToken from './../utils/setAuthToken'
import { message } from 'antd'



export const login = (user,history) => dispatch => {

    Axios.post('/api/login',user)
    .then(user=>{
        localStorage.clear()
        try {
            dispatch({
                type:Types.LOGOUT_FACULTY
            })
        } catch (error) {
            console.log(error)
        }
        
        let decode = jwtDecode(user.data.token)
       localStorage.setItem('auth_token','Bearer ' + user.data.token)

        setAuthToken('Bearer ' + user.data.token)
        dispatch({
            type: Types.SET_USER,
            payload: {
                user:decode
            }
        })
        message.success('Successfully Logged in')
        
        
    })
    .catch(error=>{
        if(error){
            console.log(error)
            console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })

}

export const register = (user, history) => dispatch => {
    Axios.post('/api/register',user)
    .then(user=>{
        console.log(user)
       
        dispatch({
            type: Types.CREATE_USER,
            payload: {
                createdUser:user
            }
        })
        history.push('/')
    })
    .catch(error=>{
        if(error){
            console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })
}

export const logout = history => {

    Axios.get('api/logout')
    .then(message=>console.log(message))
    .catch(error=>console.log(error.response.data))
    localStorage.removeItem('auth_token')
    setAuthToken(null)
    message.success('Successfully Logged out')
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}