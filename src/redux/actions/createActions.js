import {ADD_QUESTION, CREATE_QUIZ_LIST, FETCH_ERROR} from "./actionTypes";
import axios from "axios/index";

export function fetchError(error) {
    return{
        type : FETCH_ERROR,
        error
    }
}

export function addQuizQuestion(question){
    return{
        type : ADD_QUESTION,
        question
    }
}


export function createQuiz() {
    return async (dispatch, getState) => {
        try{
            await axios.post('https://react-quiz-a3365.firebaseio.com/quizes2.json',getState().create.quiz)
            dispatch(createQuizList())
        }
        catch (error){
            dispatch(fetchError(error))
        }
    }
}

export function createQuizList() {
    return{
        type : CREATE_QUIZ_LIST
    }
}
