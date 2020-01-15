import {
    ANSWER_QUESTION, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, FINISH_QUIZ, NEXT_QUESTION,
    RENDER_QUESTION, RESET
} from "../actions/actionTypes";

const initState = {
    quizes : [],
    loading: false,
    error : null,
    activeQuestion : 0,
    answerState : null,
    isFinished : false,
    result : {},
    questions : null
}

export default function quizReducer(state = initState, action) {
    switch (action.type){
        case FETCH_START:
            return {
                ...state, loading: true
            }
        case FETCH_SUCCESS:
            return{
                ...state, loading : false, quizes : action.quizes,
            }
        case FETCH_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        case RENDER_QUESTION:
            return{
                ...state, loading : false, questions: action.questions
            }
        case ANSWER_QUESTION:
            return{
                ...state, answerState: action.answerState, result: action.result
            }
        case FINISH_QUIZ:
            return{
                ...state, isFinished: true
            }
        case NEXT_QUESTION:
            return{
                ...state, activeQuestion: action.next, answerState : null
            }
        case RESET:
            return{
                ...state, isFinished : false, answerState : null, result : {}, activeQuestion : 0
            }
        default:
            return state
    }
}