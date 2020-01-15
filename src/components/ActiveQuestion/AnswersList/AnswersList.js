import React from 'react'
import Answer from './AnswerItem/AnswerItem'

import styles from './AnswersList.module.css'

export default props => {
    return (
        <div className={styles.answers}>
            <ul>
                {props.answers.map( (answer, id) => {
                    return(
                        <Answer
                            key={id}
                            index={answer.id}
                            answers={answer}
                            state={props.answerState ? props.answerState : null}
                        />
                    )
                })}
            </ul>
        </div>
    )
}