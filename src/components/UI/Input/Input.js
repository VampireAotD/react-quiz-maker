import React from 'react'
import styles from './Input.module.css'


function isInvaid({valid, touched, shouldValidate}){
    return !valid &&touched &&shouldValidate
}

export default props => {
    const type = props.type || 'text'
    const htmlFor = `${type}-${Math.random()}`
    const classes = [styles.form_control]


    if(isInvaid(props)){
        classes.push(styles.error)
    }
    return (
        <div className={classes.join(' ')}>
            <label htmlFor={htmlFor} className={styles.label}>{props.label}</label>
            <input
                className={styles.input}
                type={type}
                id={htmlFor}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            {isInvaid(props)
                ?<span className={styles.error}>{props.errorMessage || 'Введите правильное значение'}</span>
            :null}
        </div>
    )
}
