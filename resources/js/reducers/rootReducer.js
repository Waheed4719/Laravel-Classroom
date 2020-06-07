import {combineReducers} from 'redux'
import auth from './authReducer'
import cls from './classReducer'

 const rootReducer = combineReducers({
 auth,cls
})

export default rootReducer






