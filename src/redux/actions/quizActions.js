import axios from "axios";
import {
    ANSWER_QUESTION, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, FINISH_QUIZ, NEXT_QUESTION,
    RENDER_QUESTION, RESET
} from "./actionTypes";

export function fetchQuizList() {
    return async dispatch => {
        dispatch(fetchStart())
        try{
            const response = await axios.get('https://react-quiz-a3365.firebaseio.com/quizes2.json')
            const quizes = []

            Object.keys(response.data).forEach( (key, index) => {
                quizes.push({id : key, text : `Тест №${index+1}`})
            })

            dispatch(fetchSuccess(quizes))
        }
        catch (error){
            dispatch(fetchError(error))
        }
    }
}

export function fetchError(error) {
    return{
        type : FETCH_ERROR,
        error
    }
}

export function fetchStart() {
    return {
        type : FETCH_START
    }
}

export function fetchSuccess(quizes) {
    return{
        type : FETCH_SUCCESS,
        quizes
    }
}

export function answerQuizQuestion(id){
    return (dispatch, getState) => {
        const state = getState().quiz

        if(state.answerState){
            const key = Object.keys(state.answerState);
            if(this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = state.questions[state.activeQuestion]
        const result = state.result

        if(question.rightAnswer === id) {
            if (!result[question.id]) {
                result[question.id] = 'success'
            }

            dispatch(fillAnswerState({answerState: {[id]: 'success'}}, result))
        }
        else
        {
            result[question.id] = 'false';
            dispatch(fillAnswerState({answerState: {[id]: 'fail'}}, result))
        }

        const timer = window.setTimeout( () => {
            if (isFinished(state)) {
                dispatch(finishQuiz())
            }
            else {
                dispatch(nextQuestion(state.activeQuestion + 1))
            }
            clearTimeout(timer)
        },1000)
    }
}

function isFinished(state) {
    return state.activeQuestion + 1 === state.questions.length
}

export function renderQuizQuestions(id) {
    return async dispatch => {
        dispatch(fetchStart())
        try{
            const response = await axios.get(`https://react-quiz-a3365.firebaseio.com/quizes2/${id}.json`)

            const questions = response.data

            dispatch(renderQuestions(questions))
        }
        catch (error){
            dispatch(fetchError(error))
        }
    }
}

export function renderQuestions(questions) {
    return{
        type : RENDER_QUESTION,
        questions
    }
}

export function fillAnswerState(answerState, result) {
    return{
        type : ANSWER_QUESTION,
        answerState,
        result
    }
}

export function finishQuiz() {
    return{
        type : FINISH_QUIZ
    }

}

export function nextQuestion(next) {
    return{
        type : NEXT_QUESTION,
        next
    }
}

export function reset() {
    return{
        type : RESET
    }
}