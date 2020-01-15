import React from 'react'
import styles from './Layout.module.css'

class Layout extends React.Component{
    render(){
        return (
            <div className={styles.app}>
                {this.props.children}
            </div>
        )
    }
}

export default Layout