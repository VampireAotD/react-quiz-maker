import axios from 'axios'
import {AUTH_SUCCESS, LOG_OUT} from "./actionTypes";

export function register(email, password, isLogged){
    return async dispatch => {

        const formData = {
            email,
            password,
            returnSecureToken : true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjPuNauPTkkfKUZNjJYGLb70EeBA2Am5E'

        if(!isLogged){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjPuNauPTkkfKUZNjJYGLb70EeBA2Am5E'
        }

        const response = await axios.post(url, formData)
        const data = response.data

        const expire = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('localId', data.localId)
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('expire', expire)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!token){
            dispatch(logout())
        }
        else{
            const expire = new Date(localStorage.getItem('expire'))

            if(expire <= new Date().getTime()){
                dispatch(logout())
            }
            else{
                dispatch(authSuccess(token))
                dispatch(autoLogout((expire.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return{
        type : AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('localId')
    localStorage.removeItem('token')
    localStorage.removeItem('expire')

    return {
        type : LOG_OUT
    }
}