import React from 'react'
import {Context} from '../../../../containers/Questions/Questions'
import styles from './AnswerItem.module.css'

export default props => {
    const cls = [styles.item]

    if(props.state){
        if(Object.keys(props.state.answerState)[0].toString() === props.index.toString()){
            cls.push(styles[Object.values(props.state.answerState)[0]])
        }
    }

    return (
        <Context.Consumer>
            {click => {
                return(
                    <li className={cls.join(' ')}
                        key={props.index}
                        onClick={ () => click(props.answers.id)}
                    >
                        {props.answers.text}
                    </li>
                )
            }}
        </Context.Consumer>
    )
}