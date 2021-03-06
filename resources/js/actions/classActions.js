import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import * as Types from './types'
import setAuthToken from './../utils/setAuthToken'
import { message } from 'antd'

export const create_class = (classdata,history) => dispatch =>{

    console.log(classdata)
    Axios.post('api/classes',classdata)
            .then(obj=>{
                message.success("Class created successfully")
                    dispatch({
                        type: Types.CREATE_CLASS,
                        payload: {
                            createdClass: obj.data.obj
                        }
                    });
            })
            .catch(error=>{
                dispatch({
                    type: Types.CLASS_ERRORS,
                    payload: {
                        error: error.response.data
                    }
                })
            })


}



export const getMyClasses = () => async(dispatch) =>{
    try {
        const res = await Axios.get('/api/myClasses')
        dispatch({
            type: Types.GET_MY_CLASSES,
            payload: {
                myClasses : res.data.classes
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: Types.CLASS_ERRORS,
            payload: {
                error: error.response.data
            }
        })
    }
}

