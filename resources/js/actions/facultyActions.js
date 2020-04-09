import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import * as Types from './types'
import setAuthToken from './../utils/setAuthToken'
import { message } from 'antd'



export const Facultylogin = (faculty,history) => dispatch => {
console.log('inside')
    Axios.post('/api/faculty/login',faculty)
    .then(faculty=>{
        console.log(faculty.data)
        localStorage.clear()
        dispatch({
            type:Types.LOGOUT_USER
        })
        let decode = jwtDecode(faculty.data.token)
       localStorage.setItem('faculty_token','Bearer ' + faculty.data.token)

        setAuthToken('Bearer ' + faculty.data.token)
        dispatch({
            type: Types.SET_FACULTY,
            payload: {
                faculty:decode
            }
        })
        message.success('Successfully Logged in')
        
        
    })
    .catch(error=>{
        if(error){
            console.log(error)
            console.log(error.response.data)
            dispatch({
                type: Types.FACULTY_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })

}