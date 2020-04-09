import {combineReducers} from 'redux'
import auth from './authReducer'
import fac from './facultyReducer'

 const rootReducer = combineReducers({
 auth,fac
})

export default rootReducer






