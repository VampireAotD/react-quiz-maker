import React from 'react'
import Input from '../../components/UI/Input/Input'
import {makeInputs, validateInput, validateForm} from '../../components/FormValidator/FormValidator'
import {register} from "../../redux/actions/actionAuth";
import {connect} from "react-redux";
import styles from './Auth.module.css'

function create(){
    return {
        email : makeInputs({
            label : 'Email',
            type : 'email',
            placeholder : 'Введите ваш Email',
            errorMessage : 'Введите email корректно'
        },{
            required : true,
            regular : /^[\w]{1,}@(\w{1,4})\.(\w{1,5})(\.\w{1,5})?$/gmi
        }),

        password: makeInputs({
            label : 'Пароль',
            type : 'password',
            placeholder : 'Введите ваш пароль',
            errorMessage : 'Введите пароль корректно'
        },{
            required : true,
            minLength : 6
        })
    }
}

class Auth extends React.Component{

    state = {
        inputs : create(),
        formValid : false
    }

    onChangeHandler = (value, stateInput) => {
        const inputs = {...this.state.inputs}
        const find_input = {...inputs[stateInput]}

        find_input.value = value
        find_input.touched = true
        find_input.valid = validateInput(value, find_input.validation);

        inputs[stateInput] = find_input

        this.setState({
            inputs,
            formValid : validateForm(inputs)
        })
    }

    submitForm = e => {
        e.preventDefault()
    }

    registerHandler = e => {
        e.preventDefault()
        this.props.register(this.state.inputs.email.value, this.state.inputs.password.value, false)
        this.props.history.push('/')
    }

    loginHandler = e => {
        e.preventDefault()
        this.props.register(this.state.inputs.email.value, this.state.inputs.password.value, true)
        this.props.history.push('/')
    }

    createInputs(){
        return Object.keys(this.state.inputs).map( (stateInput, index) => {
            const input = this.state.inputs[stateInput]

            return (
                <Input
                    key={stateInput + index}
                    label={input.label}
                    type={input.type}
                    placeholder={input.placeholder}
                    errorMessage={input.errorMessage}
                    shouldValidate={!!input.validation}
                    valid={input.valid}
                    touched={input.touched}
                    onChange={e => this.onChangeHandler(e.target.value, stateInput)}
                />
            )
        })
    }

    render(){
        return (
            <div className={styles.auth}>
                <form onSubmit={this.submitForm}>
                    <h1>Авторизироваться</h1>
                    {this.createInputs()}

                    <button
                        onClick={this.registerHandler}
                        disabled={!this.state.formValid}
                    >Зарегестрироваться</button>
                    <button
                        onClick={this.loginHandler}
                        disabled={!this.state.formValid}
                    >Войти</button>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        register : (email, password, isLogged) => dispatch(register(email, password, isLogged))
    }
}

export default connect(null, mapDispatchToProps)(Auth)