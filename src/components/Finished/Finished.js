import React from 'react'
import {Link} from 'react-router-dom'

import styles from './Finished.module.css'

export default props => {
    const keys = Object.keys(props.results).reduce( (total, value) => {
        if(props.results[value] === 'success'){
            total++
        }
        return total
    },0);

    return (
        <div className={styles.finished}>
            { props.questions.map( (question, index) => {
                return (
                    <p  className={props.results[question.id] === 'false' ? styles.fail : styles.success}
                        key={index}>
                        {question.question}
                    </p>

                )
            })
            }

            <p>Угадали {keys} из {props.questions.length}</p>

            <button onClick={props.onClick} className={styles.retry}>Повторить</button>
            <Link to={'/'}><button className={styles.refresh}>К списку тестов</button></Link>
        </div>
    )
}