import {AUTH_SUCCESS, LOG_OUT} from "../actions/actionTypes";

const initState = {
    token : null
}

export default function authReducer(state = initState, action) {
    switch(action.type){
        case AUTH_SUCCESS :
            return{
                ...state, token : action.token
            }
        case LOG_OUT :
            return{
                ...state, token : null
            }
        default:
            return state
    }
}

