import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Footer.module.css'
import {connect} from "react-redux";

class Footer extends React.Component{

    renderLinks(links){
        return links.map( (link, index) => {
            return (
                <NavLink key={index} to={link.to} exact={link.exact}>{link.label}</NavLink>
            )
        })
    }

    render(){

        let links = [
            {id : 1, to : '/', label : 'Главная', exact : true},
            {id : 2, to : '/', label : 'Список тестов', exact : true}
        ]

        if(this.props.isAuth){
            links.push(
                {id : 3, to : '/quiz-maker', label : 'Создание нового теста', exact : true},
                {id : 4, to : '/exit', label : 'Выход', exact : true},
            )
        }
        else{
            links.push(
                {id : 3, to : '/auth', label : 'Авторизация', exact : true},
            )
        }

        return (
            <footer className={styles.footer}>
                <nav className={styles.nav}>
                    {this.renderLinks(links)}
                </nav>
            </footer>
        )
    }
}


function mapStateToProps(state) {
    return{
        isAuth : !!state.auth.token
    }
}

export default connect(mapStateToProps, null)(Footer)