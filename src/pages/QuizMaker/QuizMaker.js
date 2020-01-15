import React from 'react'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {makeInputs,validateInput, validateForm} from '../../components/FormValidator/FormValidator'
import {connect} from "react-redux";
import {addQuizQuestion, createQuiz} from "../../redux/actions/createActions";
import styles from './QuizMaker.module.css'

function createAnswers(number) {
    return makeInputs({
        label : `Вариант ${number}`,
        id : number,
        errorMessage : 'Ответ не должен быть пустым'
    },{
        required : true
    })
}

function create() {
    return {
        question : makeInputs({
            label : 'Вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        },{
            required : true
        }),

        option1 : createAnswers(1),
        option2 : createAnswers(2),
        option3 : createAnswers(3),
        option4 : createAnswers(4)
    }
}

class QuizMaker extends React.Component{

    state = {
        rightAnswer : 1,
        formValidated : false,
        inputs : create()
    }

    changeInput = (value, stateInput) => {
        const inputs = {...this.state.inputs}
        const find_input = {...inputs[stateInput]}

        find_input.value = value
        find_input.touched = true
        find_input.valid = validateInput(find_input.value,find_input.validation)

        inputs[stateInput] = find_input

        this.setState({
            inputs,
            formValidated : validateForm(inputs)
        })
    }

    submitForm = e => {
        e.preventDefault()
    }

    addQuestion = e => {
        e.preventDefault()
        const {question, option1, option2, option3, option4} = this.state.inputs

        const newQuiestion = {
            question : question.value,
            id : this.props.quiz.length + 1,
            rightAnswer: this.state.rightAnswer,
            answers : [
                {text:option1.value, id : option1.id},
                {text:option2.value, id : option2.id},
                {text:option3.value, id : option3.id},
                {text:option4.value, id : option4.id},
            ]
        }

        this.props.addNewQuestion(newQuiestion)

        this.setState({
            rightAnswer : 1,
            formValidated : false,
            inputs : create()
        })

    }

    createTest = e => {
        e.preventDefault()

        this.setState({
            quiz : [],
            rightAnswer : 1,
            formValidated : false,
            inputs : create()
        })

        this.props.createQuiz()
    }

    changeSelect = (value) => {
        this.setState({
            rightAnswer : +value
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.inputs).map( (stateInput, index) => {
            const input = {...this.state.inputs[stateInput]}
            return(
                <React.Fragment key={stateInput + index}>
                    <Input
                        label={input.label}
                        id={input + index}
                        placeholder={input.label}
                        valid={input.valid}
                        value={input.value}
                        shouldValidate={!!input.validation}
                        touched={input.touched}
                        errorMessage={input.errorMessage}
                        onChange={e => this.changeInput(e.target.value, stateInput)}
                    />
                    {index === 0 ?
                    <hr/> : null}
                </React.Fragment>
            )
        })
    }

    render(){
        return(
            <div className={styles["quiz-maker"]}>
                <form onSubmit={this.submitForm}>
                    <h1>Создание нового теста</h1>
                    {this.renderInputs()}

                    <Select
                        label='Правильный ответ'
                        onChange={e => this.changeSelect(e.target.value)}
                        value={this.state.rightAnswer}
                        name='right_answer'
                        options={[
                        {text:1, value:1},
                        {text:2, value:2},
                        {text:3, value:3},
                        {text:4, value:4}
                    ]}
                    />
                    <button
                        onClick={this.addQuestion}
                    >Добавить вопрос</button>
                    <button
                        onClick={this.createTest}
                        disabled={this.props.quiz.length === 0}
                    >Сделать тест</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz : state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return{
        addNewQuestion : question => dispatch(addQuizQuestion(question)),
        createQuiz : () => dispatch(createQuiz())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(QuizMaker)