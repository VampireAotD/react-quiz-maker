import {ADD_QUESTION, CREATE_QUIZ_LIST} from "../actions/actionTypes";

const initState = {
    quiz : []
}

export default function createReducer(state = initState, action){
    switch(action.type){
        case ADD_QUESTION :
            return{
                ...state, quiz : [...state.quiz, action.question]
            }
        case CREATE_QUIZ_LIST:
            return{
                ...state, quiz : []
            }
        default:
            return state
    }
}