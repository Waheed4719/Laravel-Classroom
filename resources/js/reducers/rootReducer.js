import {combineReducers} from 'redux'
import auth from './authReducer'
import fac from './facultyReducer'
import cls from './classReducer'

 const rootReducer = combineReducers({
 auth,fac,cls
})

export default rootReducer






