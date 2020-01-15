import React from 'react'
import Answers from './AnswersList/AnswersList'

import styles from './ActiveQuestion.module.css'

const ActiveQuestion = props => {
    return (
        <div className={styles.active}>
            <p>{props.active.question}</p>
            <p className={styles.info}>{props.questionId + 1} из {props.length}</p>

            <Answers
                answers={props.answers}
                answerState={props.answerState}
            />
        </div>
    )
}

export default ActiveQuestion