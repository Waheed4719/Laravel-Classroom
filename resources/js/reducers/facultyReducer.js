import * as Types from './../actions/types'
const init = {
    faculty : {},
    isAuthenticated : false,
    errors: {}
}


const facultyReducer = (state=init,action) =>{
    switch(action.type){
        case Types.SET_FACULTY: {
            return{
                faculty: action.payload.faculty,
                isAuthenticated: Object.keys(action.payload.faculty).length !== 0,
                errors: {}
            }
            
        }
        case Types.FACULTY_ERROR: {
            return {
                ...state,
                errors: action.payload.error
            }
        }

        case Types.LOGOUT_FACULTY: {
            return init
        }
        default: return state
    }
}

export default facultyReducer