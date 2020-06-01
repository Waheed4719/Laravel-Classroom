import * as Types from '../actions/types'
const init = {
  
    errors: {}
}
const classReducer = (state=init,action) =>{
    switch(action.type){
        case Types.CREATE_CLASS: {
            return{
                createdClass : action.payload.createdClass,
                errors: {}
            }
            
        }
        case Types.CLASS_ERRORS: {
            return {
                ...state,
                errors: action.payload.error
            }
        }
       
        default: return state
    }
}

export default classReducer