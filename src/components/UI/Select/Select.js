import React from 'react'
import styles from './Select.module.css'

export default props => {
    const name = props.name || 'select'
    const htmlFor = `${name}-${Math.random()}`

    return (
        <React.Fragment>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                    className={styles.select}
            >
                {props.options.map( (option, index) => {
                    return (
                        <option
                            key={index}
                            value={option.value}
                        >
                            {option.text}
                            </option>
                    )
                })}
            </select>
        </React.Fragment>
    )
}