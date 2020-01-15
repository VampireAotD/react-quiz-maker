import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './QuestionsList.module.css'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from "react-redux";
import {fetchQuizList} from "../../redux/actions/quizActions";

class QuestionsList extends React.Component{

    componentDidMount(){
        this.props.fetchList()
    }

    renderList(){
        return this.props.quiz.quizes.map( (test) => {
            return (
                <NavLink
                    key={test.id} to={'/question/' + test.id}
                    exact
                    className={styles.link}
                >
                    {test.text}
                </NavLink>
            )
        })
    }


    render(){
        return (
            <div className={styles.list}>
                <h1 className={styles.header}>Список вопросов</h1>
                {   this.props.loading && this.props.quiz.quizes.length !== 0 ?
                    <Loader/>
                    :
                    this.renderList()
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        quiz : state.quiz,
        loading : state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return{
        fetchList : () => dispatch(fetchQuizList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList)