import React from 'react'
import ActiveQuestion from '../../components/ActiveQuestion/ActiveQuestion'
import Finished from '../../components/Finished/Finished'
import Loader from '../../components/UI/Loader/Loader'

import {connect} from "react-redux";
import {answerQuizQuestion, renderQuizQuestions, reset} from "../../redux/actions/quizActions";

export const Context = React.createContext();

class Questions extends React.Component{

    componentDidMount(){
        this.props.renderQuestions(this.props.match.params.id)
    }

    componentWillUnmount(){
        this.props.reset()
    }

    render(){
        return(
                this.props.loading || !this.props.questions
                ?
                   <Loader/>
                :
                    this.props.isFinished
                        ?
                        <Finished
                            questions={this.props.questions}
                            results={this.props.result}
                            onClick={this.props.reset}
                        />

                        :

                        <Context.Provider value={this.props.answerQuestion}>
                            <ActiveQuestion
                                active={this.props.questions[this.props.activeQuestion]}
                                questionId={this.props.activeQuestion}
                                length={this.props.questions.length}
                                answers={this.props.questions[this.props.activeQuestion].answers}
                                answerState={this.props.answerState}
                            />
                        </Context.Provider>
        )
    }
}

function mapStateToProps(state){
    return{
        loading : state.quiz.loading,
        quiz: state.quiz,
        activeQuestion : state.quiz.activeQuestion,
        answerState : state.quiz.answerState,
        isFinished : state.quiz.isFinished,
        result : state.quiz.result,
        questions : state.quiz.questions
    }
}

function mapDispatchToProps(dispatch) {
    return{
        answerQuestion : id => dispatch(answerQuizQuestion(id)),
        renderQuestions : id => dispatch(renderQuizQuestions(id)),
        reset : () => dispatch(reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)